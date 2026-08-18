"use strict"
import {EntitySchema} from "typeorm"

const VehiculoSchema = new EntitySchema({
    name: "Vehiculo",
  tableName: "vehiculo",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    patente: {
      type: "varchar",
      length: 6,
      nullable: false,
      unique: true
    },
    modelo: {
      type: "varchar",
      length: 250,
      nullable: false,
    },
    color: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    }}
})

export default VehiculoSchema;