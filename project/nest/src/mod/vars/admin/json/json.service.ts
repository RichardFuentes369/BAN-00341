import { Inject, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateJsonDto } from './dto/create-json.dto';
import { UpdateJsonDto } from './dto/update-json.dto';
import { I18nService } from 'nestjs-i18n';
import { In, IsNull, Like, Repository } from 'typeorm';
import { Json } from './entities/json.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { execSync, spawn } from 'child_process';
import * as os from 'os';
import { FilterJsonDto } from './dto/filter-json.dto';


@Injectable()
export class JsonService {
  constructor(
    @Inject('VAR_JSON_MODULO_REPOSITORY')
    private moduloRepository: Repository<Json>,
    private i18n: I18nService
  ) { }

  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findPaginada(lang: string, filterJsonDto: FilterJsonDto) {

    const { limit, page, field = 'id', order = 'Asc' } = filterJsonDto

    if (!filterJsonDto.page && !filterJsonDto.limit) throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang, args: { field: field } })
    )

    if (field == '') throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_CAMPO_FILTRO_NO_ENVIADO', { lang, args: { field: field } })
    )
    if (!filterJsonDto.page) throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_CAMPO_PAGE_NO_ENVIADO', { lang, args: { field: field } })
    )
    if (!filterJsonDto.limit) throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_CAMPO_LIMIT_NO_ENVIADO', { lang, args: { field: field } })
    )

    if (field != '') {
      const propiedades = this.listarPropiedadesTabla(this.moduloRepository)
      const arratResult = propiedades.filter(obj => obj === field).length

      if (arratResult == 0) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field: field } })
      )
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const where: any = {};

    if (filterJsonDto.nombre !== undefined && filterJsonDto.nombre) {
      where.nombre = Like(`%${filterJsonDto.nombre}%`);
    }

    const peticion = async (page) => {
      return await this.moduloRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.moduloRepository.count({
      })
    }

    return [{
      'result': await peticion(skipeReal),
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page - 1,
        'next': (await peticion(page * limit)).length == 0 ? null : page + 1,
        'totalRecord': await totalRecords()
      },
      'order': {
        'order': order,
        'field': field
      }
    }]

  }

  findName(
    name: string,
  ) {
    return this.moduloRepository.findOne({
      where: [{ nombre: name }],
      order: { id: 'DESC' }
    });
  }

  findOne(
    lang: string,
    id: number
  ) {
    return this.moduloRepository.findOne({
      where: [{ id: id }],
      order: { id: 'DESC' }
    });
  }

  async create(
    lang: string,
    createJsonDto: CreateJsonDto,
    userId: number
  ) {
    try {

      const encontrarVariable = await this.findName(createJsonDto.nombre)

      if (encontrarVariable) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_USER_EXIST', { lang, args: { nombre: createJsonDto.nombre } })
      )

      this.moduloRepository.save(createJsonDto);
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
    updateJsonDto: UpdateJsonDto,
    userId: number
  ) {
    const property = await this.moduloRepository.findOne({
      where: { id }
    });

    if (updateJsonDto.nombre) {
      if (updateJsonDto.nombre != property.nombre) {

        let concidencia = await this.moduloRepository.findOne({
          where: [{ nombre: updateJsonDto.nombre }]
        });

        if (concidencia) throw new NotFoundException(
          this.i18n.t('user.MSJ_ERROR_USER_EXIST', { lang, args: { correo: updateJsonDto.nombre } })
        )

      }
    }

    return this.moduloRepository.save({
      ...property, // existing fields
      ...updateJsonDto // updated fields
    });
  }

  async remove(
    lang: string,
    id: number[],
    userId: number
  ) {
    return this.moduloRepository.delete({ id: In(id) })
  }

  async contadorVariables(
    lang: string
  ) {
    const cont1 = await this.moduloRepository.count()

    const data = {
      "count_total_json": cont1
    }

    return data
  }

  async getJson(name: string) {
    return this.moduloRepository.findOne({
      where: [{ nombre: name }]
    });
  }

  async actualizarIpSocket() {
    const nets = os.networkInterfaces();
    let localIp = 'No encontrada';

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          localIp = net.address;
          break;
        }
      }
    }

    const property = await this.moduloRepository.findOne({
      where: [{ nombre: 'socket_barcode' }]
    });

    let config = JSON.parse(property.valor);

    if (typeof config === 'string') {
      config = JSON.parse(config);
    }

    config.ip_socket_barcode = nets.wlp2s0[0].address;

    property.valor = JSON.stringify(config);

    await this.moduloRepository.save(property);

    return nets.wlp2s0[0].address;
  }

}
