import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { supabase } from "../supabase/client";

class Pacientes extends Component {
  state = {
    data: [],
    modal: false,
    modalBorrar: false,
    tipoModal: "",
    form: {
      id: "",
      nombre: "",
      apellido: "",
      direccion: "",
      localidad: "",
      provincia: "",
      telefono: "",
      dni: "",
      fecha_nac: "",
      obra_social: "",
      fecha_ingreso: "",
    },
  };

  show = () => {
    this.setState({ modal: !this.state.modal });
  };

  listadoPacientes = async () => {
    try {
      const { data, error } = await supabase
        .from("pacientes")
        .select("*")
        .order("id", { ascending: true });
      this.setState({ data });

      // return data;
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  altaPaciente = async (form) => {
    try {
      let { data, error } = await supabase.from("pacientes").insert({
        nombre: form.nombre,
        apellido: form.apellido,
        direccion: form.direccion,
        localidad: form.localidad,
        provincia: form.provincia,
        telefono: form.telefono,
        dni: form.dni,
        fecha_nac: form.fecha_nac,
        obra_social: form.obra_social,
        fecha_ingreso: form.fecha_ingreso,
      });
      this.show();
      this.listadoPacientes();
    } catch (error) {
      console.error(error);
    }
  };

  seleccionarPaciente = (paciente) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: paciente.id,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        direccion: paciente.direccion,
        localidad: paciente.localidad,
        provincia: paciente.provincia,
        telefono: paciente.telefono,
        dni: paciente.dni,
        fecha_nac: paciente.fecha_nac,
        obra_social: paciente.obra_social,
        fecha_ingreso: paciente.fecha_ingreso,
      },
    });
  };

  modificarPaciente = async (form) => {
    try {
      const { data, error } = await supabase
        .from("pacientes")
        .update({
          nombre: form.nombre,
          apellido: form.apellido,
          direccion: form.direccion,
          localidad: form.localidad,
          provincia: form.provincia,
          telefono: form.telefono,
          dni: form.dni,
          fecha_nac: form.fecha_nac,
          obra_social: form.obra_social,
          fecha_ingreso: form.fecha_ingreso,
        })
        .eq("id", this.state.form.id)
        .select();

      this.show();
      this.listadoPacientes();
    } catch (error) {
      console.error(error);
    }
  };

  borrarPaciente = async () => {
    try {
      const { error } = await supabase
        .from("pacientes")
        .delete()
        .eq("id", this.state.form.id);

      this.setState({ modalBorrar: false });
      this.listadoPacientes();
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.listadoPacientes();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="w-100 m-auto">
        <h2 className="h2 text-center mb-4">Listado de Pacientes</h2>
        <hr />
        <button
          className="btn btn-primary rounded-pill my-4 px-3"
          onClick={() => {
            this.setState({ tipoModal: "insertar" });
            this.show();
          }}
        >
          AGREGAR PACIENTE
        </button>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ fontSize: 12 }}>ID</th>
                <th style={{ fontSize: 12 }}>Nombre</th>
                <th style={{ fontSize: 12 }}>Apellido</th>
                <th style={{ fontSize: 12 }}>Direccion</th>
                <th style={{ fontSize: 12 }}>Localidad</th>
                <th style={{ fontSize: 12 }}>Provincia</th>
                <th style={{ fontSize: 12 }}>Telefono</th>
                <th style={{ fontSize: 12 }}>Dni</th>
                <th style={{ fontSize: 12 }}>Fecha Nac</th>
                <th style={{ fontSize: 12 }}>Obra Social</th>
                <th style={{ fontSize: 12 }}>Fecha Ingreso</th>
                <th style={{ fontSize: 12 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((paciente) => {
                return (
                  <tr>
                    <td style={{ fontSize: 10 }}>{paciente.id}</td>
                    <td style={{ fontSize: 10 }}>{paciente.nombre}</td>
                    <td style={{ fontSize: 10 }}>{paciente.apellido}</td>
                    <td style={{ fontSize: 10 }}>{paciente.direccion}</td>
                    <td style={{ fontSize: 10 }}>{paciente.localidad}</td>
                    <td style={{ fontSize: 10 }}>{paciente.provincia}</td>
                    <td style={{ fontSize: 10 }}>{paciente.telefono}</td>
                    <td style={{ fontSize: 10 }}>{paciente.dni}</td>
                    <td style={{ fontSize: 10 }}>{paciente.fecha_nac}</td>
                    <td style={{ fontSize: 10 }}>{paciente.obra_social}</td>
                    <td style={{ fontSize: 10 }}>{paciente.fecha_ingreso}</td>
                    <td>
                      <button
                        className="btn btn-primary ms-2 float-end"
                        style={{ fontsize: 8 }}
                        onClick={() => {
                          this.seleccionarPaciente(paciente);
                          this.show();
                        }}
                      >
                        EDITAR
                      </button>
                      <button
                        className="btn btn-danger ms-2 float-end"
                        style={{ fontsize: 8 }}
                        onClick={() => {
                          this.seleccionarPaciente(paciente);
                          this.setState({ modalBorrar: true });
                        }}
                      >
                        BORRAR
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal isOpen={this.state.modal}>
            <ModalHeader>
              <span
                className="btn btn-close"
                onClick={() => {
                  this.show();
                }}
              ></span>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit={this.handleSubmit}>
                <div className="border rounded p-2 mb-3">
                  <label className="text-primary badge">Nombre:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese el Nombre"
                    name="nombre"
                    value={form ? form.nombre : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Apellido:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese el Apellido"
                    name="apellido"
                    value={form ? form.apellido : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Direccion:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la Dirección"
                    name="direccion"
                    value={form ? form.direccion : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Localidad:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la localidad"
                    name="localidad"
                    value={form ? form.localidad : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Provincia:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la Provincia"
                    name="provincia"
                    value={form ? form.provincia : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Telefono:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese el Telefono"
                    name="telefono"
                    value={form ? form.telefono : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">DNI:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese el DNI"
                    name="dni"
                    value={form ? form.dni : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">
                    Fecha Nacimiento:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la Fecha Nacimiento"
                    name="fecha_nac"
                    value={form ? form.fecha_nac : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Obra Social:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la Obra Social"
                    name="obra_social"
                    value={form ? form.obra_social : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Fecha Ingreso:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la fecha de ingreso"
                    name="fecha_ingreso"
                    value={form ? form.fecha_ingreso : ""}
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              {this.state.tipoModal === "insertar" ? (
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={() => {
                    this.altaPaciente(form);
                  }}
                >
                  GUARDAR
                </button>
              ) : (
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={() => {
                    this.modificarPaciente(form);
                  }}
                >
                  ACTUALIZAR
                </button>
              )}
              <button
                className="btn btn-danger rounded-pill px-4"
                onClick={this.show}
              >
                CANCELAR
              </button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalBorrar}>
            <ModalBody>
              <h4 className="h5 text-center py-4">
                Esta seguro que desea Eliminar al paciente {form.apellido}
                {form.nombre}
              </h4>
            </ModalBody>

            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.borrarPaciente();
                }}
              >
                SI
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  this.setState({ modalBorrar: false });
                  this.listadoPacientes();
                }}
              >
                NO
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Pacientes;
