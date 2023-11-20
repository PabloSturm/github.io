import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { supabase } from "../supabase/client";

class Doctores extends Component {
  state = {
    data: [],
    modal: false,
    modalBorrar: false,
    tipoModal: "",
    formD: {
      id: "",
      nombre: "",
      apellido: "",
      matricula: "",
      especialidad: "",
      telefono: "",
      dni: "",
    },
  };

  show = () => {
    this.setState({ modal: !this.state.modal });
  };

  listadoDoctores = async () => {
    try {
      const { data, error } = await supabase
        .from("doctores")
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
      formD: {
        ...this.state.formD,
        [e.target.name]: e.target.value,
      },
    });
  };

  altaDoctor = async (formD) => {
    try {
      let { data, error } = await supabase.from("doctores").insert({
        nombre: formD.nombre,
        apellido: formD.apellido,
        matricula: formD.matricula,
        especialidad: formD.especialidad,
        telefono: formD.telefono,
        dni: formD.dni,
      });
      this.show();
      this.listadoDoctores();
    } catch (error) {
      console.error(error);
    }
  };

  seleccionarDoctor = (doctor) => {
    this.setState({
      tipoModal: "actualizar",
      formD: {
        id: doctor.id,
        nombre: doctor.nombre,
        apellido: doctor.apellido,
        matricula: doctor.matricula,
        especialidad: doctor.especialidad,
        telefono: doctor.telefono,
        dni: doctor.dni,
      },
    });
  };

  modificarDoctor = async (formD) => {
    try {
      const { data, error } = await supabase
        .from("doctores")
        .update({
          nombre: formD.nombre,
          apellido: formD.apellido,
          matricula: formD.matricula,
          especialidad: formD.especialidad,
          telefono: formD.telefono,
          dni: formD.dni,
        })
        .eq("id", this.state.formD.id)
        .select();

      this.show();
      this.listadoDoctores();
    } catch (error) {
      console.error(error);
    }
  };

  borrarDoctor = async () => {
    try {
      const { error } = await supabase
        .from("doctores")
        .delete()
        .eq("id", this.state.form.id);

      this.setState({ modalBorrar: false });
      this.listadoDoctores();
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.listadoDoctores();
  }

  render() {
    const { formD } = this.state;
    return (
      <div className="w-100 m-auto">
        <h2 className="h2 text-center mb-4">Listado de Doctores</h2>
        <hr />
        <button
          className="btn btn-primary rounded-pill my-4 px-3"
          onClick={() => {
            this.setState({ tipoModal: "insertar" });
            this.show();
          }}
        >
          AGREGAR DOCTOR
        </button>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ fontSize: 12 }}>ID</th>
                <th style={{ fontSize: 12 }}>Nombre</th>
                <th style={{ fontSize: 12 }}>Apellido</th>
                <th style={{ fontSize: 12 }}>Matricula</th>
                <th style={{ fontSize: 12 }}>Especialidad</th>
                <th style={{ fontSize: 12 }}>Telefono</th>
                <th style={{ fontSize: 12 }}>Dni</th>
                <th style={{ fontSize: 12 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((doctor) => {
                return (
                  <tr>
                    <td style={{ fontSize: 10 }}>{doctor.id}</td>
                    <td style={{ fontSize: 10 }}>{doctor.nombre}</td>
                    <td style={{ fontSize: 10 }}>{doctor.apellido}</td>
                    <td style={{ fontSize: 10 }}>{doctor.matricula}</td>
                    <td style={{ fontSize: 10 }}>{doctor.especialidad}</td>
                    <td style={{ fontSize: 10 }}>{doctor.telefono}</td>
                    <td style={{ fontSize: 10 }}>{doctor.dni}</td>

                    <td>
                      <button
                        className="btn btn-primary ms-2 float-end"
                        style={{ fontsize: 8 }}
                        onClick={() => {
                          this.seleccionarDoctor(doctor);
                          this.show();
                        }}
                      >
                        EDITAR
                      </button>
                      <button
                        className="btn btn-danger ms-2 float-end"
                        style={{ fontsize: 8 }}
                        onClick={() => {
                          this.seleccionarDoctor(doctor);
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
                    value={formD ? formD.nombre : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Apellido:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese el Apellido"
                    name="apellido"
                    value={formD ? formD.apellido : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Matrícula:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la Matricula"
                    name="matricula"
                    value={formD ? formD.matricula : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">Especialidad:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese la Especialidad"
                    name="especialidad"
                    value={formD ? formD.especialidad : ""}
                    onChange={this.handleChange}
                  />

                  <label className="text-primary badge">Telefono:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese el Telefono"
                    name="telefono"
                    value={formD ? formD.telefono : ""}
                    onChange={this.handleChange}
                  />
                  <label className="text-primary badge">DNI:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese el DNI"
                    name="dni"
                    value={formD ? formD.dni : ""}
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
                    this.altaDoctor(formD);
                  }}
                >
                  GUARDAR
                </button>
              ) : (
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={() => {
                    this.modificarDoctor(formD);
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
                Esta seguro que desea Eliminar al Doctor {formD.apellido}
                {formD.nombre}
              </h4>
            </ModalBody>

            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.borrarDoctor();
                }}
              >
                SI
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  this.setState({ modalBorrar: false });
                  this.listadoDoctores();
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
export default Doctores;
