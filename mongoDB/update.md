db.test.updateOne(
    {_id: ObjectId('valor id')},
    {
        $set: {nombre: 'pepe', apellido: 'suarez', edad: 50}
    }
)