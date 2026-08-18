"use strict";
import Vehiculo from "../entity/vehiculo.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getVehiculoService(query) {
  try {
    const { id } = query;

    const vehiculoRepository = AppDataSource.getRepository(Vehiculo);

    const vehiculoFound = await vehiculoRepository.findOne({
      where: [{ id: id }],
    });

    if (!vehiculoFound) return [null, "Vehiculo no encontrado"];

    return [vehiculoData, null];
  } catch (error) {
    console.error("Error obtener el vehiculo:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getvehiculosService() {
  try {
    const vehiculoRepository = AppDataSource.getRepository(vehiculo);

    const vehiculos = await vehiculoRepository.find();

    if (!vehiculos || vehiculos.length === 0) return [null, "No hay vehiculos"];

    const vehiculosData = vehiculos.map(({ password, ...vehiculo }) => vehiculo);

    return [vehiculosData, null];
  } catch (error) {
    console.error("Error al obtener a los vehiculos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updatevehiculoService(query, body) {
  try {
    const { id, rut, email } = query;

    const vehiculoRepository = AppDataSource.getRepository(vehiculo);

    const vehiculoFound = await vehiculoRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!vehiculoFound) return [null, "vehiculo no encontrado"];

    const existingvehiculo = await vehiculoRepository.findOne({
      where: [{ rut: body.rut }, { email: body.email }],
    });

    if (existingvehiculo && existingvehiculo.id !== vehiculoFound.id) {
      return [null, "Ya existe un vehiculo con el mismo rut o email"];
    }

    if (body.password) {
      const matchPassword = await comparePassword(
        body.password,
        vehiculoFound.password,
      );

      if (!matchPassword) return [null, "La contraseña no coincide"];
    }

    const datavehiculoUpdate = {
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      email: body.email,
      rol: body.rol,
      updatedAt: new Date(),
    };

    if (body.newPassword && body.newPassword.trim() !== "") {
      datavehiculoUpdate.password = await encryptPassword(body.newPassword);
    }

    await vehiculoRepository.update({ id: vehiculoFound.id }, datavehiculoUpdate);

    const vehiculoData = await vehiculoRepository.findOne({
      where: { id: vehiculoFound.id },
    });

    if (!vehiculoData) {
      return [null, "vehiculo no encontrado después de actualizar"];
    }

    const { password, ...vehiculoUpdated } = vehiculoData;

    return [vehiculoUpdated, null];
  } catch (error) {
    console.error("Error al modificar un vehiculo:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deletevehiculoService(query) {
  try {
    const { id, rut, email } = query;

    const vehiculoRepository = AppDataSource.getRepository(vehiculo);

    const vehiculoFound = await vehiculoRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!vehiculoFound) return [null, "vehiculo no encontrado"];

    if (vehiculoFound.rol === "administrador") {
      return [null, "No se puede eliminar un vehiculo con rol de administrador"];
    }

    const vehiculoDeleted = await vehiculoRepository.remove(vehiculoFound);

    return [datavehiculo, null];
  } catch (error) {
    console.error("Error al eliminar un vehiculo:", error);
    return [null, "Error interno del servidor"];
  }
}