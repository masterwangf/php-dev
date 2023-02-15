db.createUser(
    {
        user: "test",
        pwd: "test",
        roles:[
            {
                role: 'readWrite',
                db: 'stream_media_assets'
            }
        ]
    }
)