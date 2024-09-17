
Eliminamos al elemento que su edad sea equivalente a 70

Variante 1:
db.test.deleteOne({edad: {$eq: 70}})

Variante 2:
db.test.deleteOne({edad:  70})

Eliminar a un elemento por su id:
db.test.deleteOne({_id: ObjectId('66e8b473ae17203056c35a59')})


Eliminar a todos los elementos que cumplan con la condición de que su nombre sea 'pepe':
db.test.deleteMany({nombre: 'pepe'})