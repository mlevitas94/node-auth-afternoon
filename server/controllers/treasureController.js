module.exports={
    dragonTreasure:async (req,res)=>{
        const db = req.app.get('db')
        
        const treasure = await db.get_dragon_treasure(1)
        return res.status(200).send(treasure)
    },

    getMyTreasure:async (req,res)=>{
        const db = req.app.get('db')
        
        const treasure = await db.get_my_treasure(req.session.user.id)
        return res.status(200).send(treasure) 
    },

    getAllTreasure:async (req,res)=>{
        const db = req.app.get('db')
        
        const allTreasure = await db.get_all_treasure()
        return res.status(200).send(allTreasure)
    },

    addMyTreasure:async(req,res)=>{
        const db = req.app.get('db')

        const {treasureURL} = req.body
        const {id} = req.session.user

        const treasure = await db.add_user_treasure([treasureURL,id])

        res.status(201).send(treasure)
    }

}