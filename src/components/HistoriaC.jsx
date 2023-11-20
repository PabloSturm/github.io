import React, { Component } from "react";

class HistoriaC extends Component {
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

  render() {
    return (
      <div className="h1 text-center my-4">
        HISTORIA CLINICA
        <div class="container">
          <div class="row">
            <div class="col-md-6 mt-4 text-center">
              <h2 className="h2 text-center mb-4">Paciente</h2>
              <hr />
              <button
                className="btn btn-primary rounded-pill my-4 px-3"
                onClick={() => {
                  this.setState({ tipoModal: "insertar" });
                  this.show();
                }}
              >
                AGREGAR
              </button>
            </div>
            <div class="col-md-6 mt-4 text-center">
              <h2 className="h2 text-center mb-4">Doctor</h2>
              <hr />
              <button
                className="btn btn-primary rounded-pill my-4 px-3"
                onClick={() => {
                  this.setState({ tipoModal: "insertar" });
                  this.show();
                }}
              >
                AGREGAR
              </button>
            </div>
          </div>
          <form className="form-group" onSubmit={this.handleSubmit}>
            <div className="col-md-3 border rounded p-2 mb-3">
              <label className="text-primary badge">Fecha de Visita:</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese Fecha de Visita"
                name="fecha_visita"
              />
            </div>
            <div className="col-md-12 border rounded p-2 mb-3">
              <label className="text-primary badge">Observaciones:</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese que se ha observado en la revisión"
                name="observaciones"
              />
            </div>
            <div className="col-md-12 border rounded p-2 mb-3">
              <label className="text-primary badge">Diagnóstico:</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese el Diagnóstico"
                name="diagnostico"
              />
              <label className="text-primary badge">Receta:</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese la Prescripción médica"
                name="receta"
              />

              <label className="text-primary badge">Proxima Visita:</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese la Próxima Visita"
                name="proxima_visita"
              />
            </div>
          </form>
          <button
            className="btn btn-primary rounded-pill my-4 px-3"
            onClick={() => {
              this.setState({ tipoModal: "insertar" });
              this.show();
            }}
          >
            AGREGAR HISTORIA CLINICA
          </button>
        </div>
      </div>
    );
  }
}
export default HistoriaC;
