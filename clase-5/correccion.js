"use strict";
class Empleado {
    constructor(nombre, sueldo, fecha_contratacion, id_empleado, tipo) {
        this.nombre = nombre;
        this.sueldo = sueldo;
        this.fecha_contratacion = fecha_contratacion;
        this.id_empleado = id_empleado;
        this.tipo = tipo;
    }
    presentarse(nombre) {
        console.log("hola " + nombre + " soy " + this.nombre + ' y trabajo como ' + this.tipo);
    }
}
class Pasante extends Empleado {
    constructor(nombre, sueldo, fecha_contratacion, id_empleado, tipo, tiempo_de_contrato_en_meses) {
        /* Esta es la invocacion del constructor del Empleado */
        super(nombre, sueldo, fecha_contratacion, id_empleado, tipo);
        this.tiempo_de_contrato_en_meses = tiempo_de_contrato_en_meses;
    }
    hacerCosasDePasante() {
        if (this.tipo === 'Developer') {
            console.log('hacer un while true es mi pasion');
        }
    }
    presentarse(nombre) {
        console.log("hola " + nombre + " soy " + this.nombre + ' y trabajo como pasante de ' + this.tipo);
    }
}
class ManejadorDeEmpleados {
    constructor(id_manejador) {
        this.empleados = [];
        this.id_manejador = id_manejador;
        this.tipos_permitidos = ["Project Manager", "Developer", "Designer", "Marketing", "HR"];
        this.contador_id = 1;
    }
    agregarEmpleado(nombre, sueldo, fecha_contratacion, tipo) {
        if (!this.tipos_permitidos.includes(tipo)) {
            console.error(`Error: El tipo de empleado "${tipo}" no es válido.`);
        }
        else {
            const nuevo_empleado = new Empleado(nombre, sueldo, fecha_contratacion, this.contador_id++, tipo);
            this.empleados.push(nuevo_empleado);
            console.log(`Empleado ${nombre} agregado con éxito con ID ${this.contador_id}.`);
        }
    }
    obtenerEmpleadoPorId(id_empleado) {
        const empleado = this.empleados.find((empleado) => empleado.id_empleado === id_empleado);
        if (empleado) {
            return empleado;
        }
        else {
            return null;
        }
    }
    obtenerEmpleadosPorTipo(tipo) {
        const empleados_filtrados = this.empleados.filter(empleado => empleado.tipo === tipo);
        if (empleados_filtrados.length > 0) {
            console.log(`Empleados de tipo "${tipo}":`);
            empleados_filtrados.forEach(empleado => {
                console.log(`- ID: ${empleado.id_empleado}, Nombre: ${empleado.nombre}, Sueldo: ${empleado.sueldo}`);
            });
        }
        else {
            console.log(`No se encontraron empleados de tipo "${tipo}".`);
        }
    }
    obtener_empleados_por_id(id_empleado) {
        return this.empleados.filter((empleado) => {
            return (empleado.id_empleado == id_empleado);
        });
    }
}
const pepe = new Empleado('pepe', 2000000, new Date(), 1, 'Developer');
const susana = new Pasante('Susana', 820000, new Date(), 2, 'Developer', 6);
console.log(pepe, susana);
pepe.presentarse('Juan');
susana.presentarse('Elias');
susana.hacerCosasDePasante();
const manejador_de_empleados = new ManejadorDeEmpleados(1);
/* manejador_de_empleados.agregarEmpleado('pepe', 10000, new Date(), "Developer") */
/* const empleadoPepe = new Empleado('pepe', 1000, new Date(), 1, 'Developer') //Creo un nuevo empleado */
//SUPER MALA PRACTICA
/* manejador_de_empleados.empleados.push(empleadoPepe)
 */
console.log(manejador_de_empleados.obtener_empleados_por_id(20));
console.log('hola');
/* manejador_de_empleados.agregarEmpleado('Santiago Barletta', 1000000, new Date(), 'Project Manager');
manejador_de_empleados.agregarEmpleado('Pepe Pompím', 500000, new Date(), 'Developer');
manejador_de_empleados.agregarEmpleado('Freddy Kruegger', 350000, new Date(), 'Designer');
manejador_de_empleados.agregarEmpleado('Jason Voorhees', 300000, new Date(), 'Marketing');

console.log(manejador_de_empleados);
manejador_de_empleados.obtenerEmpleadoPorId(1);
manejador_de_empleados.obtenerEmpleadosPorTipo('Developer');
manejador_de_empleados.obtenerEmpleadosPorTipo('Marketing'); */
/*
//Invocar la alerta
alert
*/
//Persona
//tiene: saludar, comer
/* const persona_1 = {
    nombre: 'pepe',

}

persona_1.saludar() */ 
