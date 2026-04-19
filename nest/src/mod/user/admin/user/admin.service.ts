import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import * as ExcelJS from 'exceljs';
import { stringify } from 'csv-stringify/sync';

import { In, Like, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { FilterUserDto } from '@module/user/dto/filter-user.dto';
import { I18nService } from 'nestjs-i18n';
import { Asignacion } from '../permission/asignacion/entities/asignacion.entity';
import { AsignacionService } from '../permission/asignacion/asignacion.service';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
    private readonly asignacionService: AsignacionService,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(
    filterUserDto: FilterUserDto,
    lang: string
  ) {

    const { limit, page, field = 'id' , order = 'Asc' } = filterUserDto
    
    if(!filterUserDto.page && !filterUserDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang, args: { field: field } })
    )

    if(field == '') throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_FILTRO_NO_ENVIADO', { lang, args: { field: field } })
    )
    if(!filterUserDto.page) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_PAGE_NO_ENVIADO', { lang, args: { field: field } })
    )
    if(!filterUserDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_LIMIT_NO_ENVIADO', { lang, args: { field: field } })
    )

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.adminRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field: field } })
      )
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const where: any = {};

    if (filterUserDto.email !== undefined && filterUserDto.email) {
      where.email = Like(`%${filterUserDto.email}%`);
    }
    if (filterUserDto.firstName !== undefined && filterUserDto.firstName) {
      where.firstName = Like(`%${filterUserDto.firstName}%`);
    }
    if (filterUserDto.lastName !== undefined && filterUserDto.lastName) {
      where.lastName = Like(`%${filterUserDto.lastName}%`);
    }
    if (filterUserDto.isActive !== undefined && filterUserDto.isActive === 0 || filterUserDto.isActive === 1) {
      where.isActive = filterUserDto.isActive;
    }

    const [registros, total] = await this.adminRepository.findAndCount({
      skip: skipeReal,
      take: limit,
      where: where,
      order: { [field]: order },
      relations: { asignaciones: true } 
    });

    const result = registros.map(admin => {
      return {
        ...admin,
        totalPermisos: admin.asignaciones ? admin.asignaciones.length : 0,
        asignaciones: undefined 
      };
    });

    return [{
      'result': result,
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page === 1) ? null : page - 1,
        'next': (skipeReal + limit < total) ? page + 1 : null,
        'totalRecord': total
      },
      'order': {
        'order': order,
        'field': field
      }
    }];
  }

  findOne(
    lang: string,
    id: number
  ) {
    return this.adminRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });
  }

  async findUsernameEmail(
    username: string
  ): Promise<Admin>{
    return this.adminRepository.findOne({
      where: [ {email : username}]
    });
  }

  // requieren permisos de usuario
  async create(
    lang: string,
    createAdminDto: CreateAdminDto,
    userId: number
  ) {
    try {

      const encontrarCorreo = await this.findUsernameEmail(createAdminDto.email)

      if(encontrarCorreo) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_USER_EXIST', { lang, args: { correo: createAdminDto.email } })
      )      
  
      this.adminRepository.save(createAdminDto);
      return {
        'title': this.i18n.t('user.MSJ_USUARIO_TITTLE', { lang }),
        'message': this.i18n.t('user.MSJ_USUARIO_CREADO_EXITOSAMENTE_TITTLE', { lang }),
        'status': 200,
      }

    } catch (error) {
      return {
        'title': error.response.error,
        'text': error.response.error,
        'message': error.response.message,
        'status': 404,
      }
    }
  }

  async update(
    lang: string, 
    id: number, 
    updateAdminDto: UpdateAdminDto,
    userId: number
  ) {
    const property = await this.adminRepository.findOne({
      where: { id }
    });

    if(updateAdminDto.email){
      if(updateAdminDto.email != property.email){
  
        let concidencia = await this.adminRepository.findOne({
          where: [ {email : updateAdminDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(
          this.i18n.t('user.MSJ_ERROR_USER_EXIST', { lang, args: { correo: updateAdminDto.email } })
        )
        
      }
    }

    return this.adminRepository.save({
      ...property, // existing fields
      ...updateAdminDto // updated fields
    });
  }

  updateStatus(
    lang: string, 
    id: number[], 
    isActiveo: boolean,
    userId: number
  ) {
    return this.adminRepository.update(
        { id: In(id) },
        { isActive: isActiveo } 
    );
  }  
  
  async remove(
    lang: string,
    id: number[],
    userId: number
  ) {
    await this.asignacionService.eliminarAsignadosPorUsuario(id)
    return this.adminRepository.delete({id: In(id)})
  }

  async contadoresUsuarios(
    lang: string
  ){
    const cont1 =  await this.adminRepository.count()
    const cont2 = await this.adminRepository.count({ where: { isActive: true } })
    const cont3 = await this.adminRepository.count({ where: { isActive: false } })
    const cont4 = await this.asignacionService.contadoresPermisosAsignados()
    
    const data = {
      "count_total_users": cont1,
      "count_actived_users": cont2,
      "count_suspend_users": cont3,
      "count_permissions_assigment": cont4,
    }

    return data
  }

  // reporte pendiente permisos
  async generarExcel(allParams: any, lang: string) {
    const where: any = {};

    const getSearchValue = (param: any) => {
      if (Array.isArray(param)) {
        const val = param.find(v => v !== 'true');
        return (val !== undefined && val !== '') ? val : null;
      }
      return (param !== 'true' && param !== '' && param !== undefined) ? param : null;
    };

    const emailVal = getSearchValue(allParams.email);
    if (emailVal) where.email = Like(`%${emailVal}%`);

    const firstNameVal = getSearchValue(allParams.firstName);
    if (firstNameVal) where.firstName = Like(`%${firstNameVal}%`);

    const lastNameVal = getSearchValue(allParams.lastName);
    if (lastNameVal) where.lastName = Like(`%${lastNameVal}%`);

    const activeVal = getSearchValue(allParams.isActive);
    if (activeVal !== null) {
      where.isActive = (activeVal == 0) ? 0 : 1;
    }

    const data = await this.adminRepository.find({ where });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Lotes');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Nombre', key: 'firstName', width: 20 },
      { header: 'Apellido', key: 'lastName', width: 20 },
      { header: 'Estado', key: 'isActive', width: 15 }
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const val = allParams[col.key];
      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });

    worksheet.columns = dynamicColumns;
    worksheet.addRows(data);
    return await workbook.xlsx.writeBuffer();
  }

  async generarCsv( allParams: any, lang: string){
    const where: any = {};

    const getSearchValue = (param: any) => {
      if (Array.isArray(param)) {
        const val = param.find(v => v !== 'true');
        return (val !== undefined && val !== '') ? val : null;
      }
      return (param !== 'true' && param !== '' && param !== undefined) ? param : null;
    };

    const emailVal = getSearchValue(allParams.email);
    if (emailVal) where.email = Like(`%${emailVal}%`);

    const firstNameVal = getSearchValue(allParams.firstName);
    if (firstNameVal) where.firstName = Like(`%${firstNameVal}%`);

    const lastNameVal = getSearchValue(allParams.lastName);
    if (lastNameVal) where.lastName = Like(`%${lastNameVal}%`);

    const activeVal = getSearchValue(allParams.isActive);
    if (activeVal !== null) {
      where.isActive = (activeVal == 0) ? 0 : 1;
    }

    const data = await this.adminRepository.find({ where });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Nombre', key: 'firstName', width: 20 },
      { header: 'Apellido', key: 'lastName', width: 20 },
      { header: 'Estado', key: 'isActive', width: 15 }
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const val = allParams[col.key];
      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });
    
    worksheet.columns = dynamicColumns;
    worksheet.addRows(data);

    return await workbook.csv.writeBuffer({
      formatterOptions: {
        delimiter: ',',      
        quote: '"'
      }
    });
  }

}
