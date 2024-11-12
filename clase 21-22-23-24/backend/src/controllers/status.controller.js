

export const postPingController = (req, res) => {
    console.log(
        'Consulta recibida en /api/status/ping de tipo POST. Body:', req.body
    )

    console.log(req.user)
    res.json({status: 200, message: 'Pong', ok: true})
}

