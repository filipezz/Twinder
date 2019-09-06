const Dev = require('../models/Dev')
const Twit = require('twit')


module.exports = {
//busca a listagem de devs
    async index(req, res){

        const {user} = req.headers;  // id do usuario logado
        const loggedDev = await Dev.findById(user); //instancia do usuario no banco de dados
        
        const users = await Dev.find({   // busca por todos usuarios que o usuário logado não deu like ou dislike 
            $and: [
                { _id: { $ne: user } },  // $ne = Not Equal
                { _id: { $nin: loggedDev.likes }}, //$nin = Not In
                { _id: { $nin: loggedDev.dislikes }}              
            ]
        });
        
        return res.json(users);

    },

    async store(req,res){


        var T = new Twit({
          
          consumer_key:         '6OAHo6nAZPoBIVwst2THXjgDU',
          consumer_secret:      'X06UiawuRkdZnWtkF7M8F4poOZZnnwxqHlyG1eoKLfPgX6tEnZ',
          access_token:         '96197722-TsgtTXzdsyjLcRrUNnxViiCywIao3SAh3ftcyIZ97',
          access_token_secret:  'aT0CVUzmVryXRElEAgAGWBUX9RzVaZweh51pKrFbLmicA',
          timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
          strictSSL:            true,     // optional - requires SSL certificates to be valid.
          
        })
        
        const { username } = req.body
        
        await T.get('users/show', { screen_name: username }, function(err, data, response) {
        
         

          const profilePicture = data.profile_image_url
          //Pega a imagem de avatar num tamanho menor(retira o _normal)
          const bigProfilePicture = profilePicture.replace('_normal','')
          
          //Filtra e armazena os dados desejados da API do twitter
          const userInfo = {
            name: data.name,
            bio: data.description,
            user: username.toLowerCase(),
            avatar: bigProfilePicture }
        
        // verifica se não existe com userExists, se não, executa a função salvaDados
        async function userExists(){
        const userExists = await Dev.findOne({user: username.toLowerCase()});

        if(userExists){
            return res.json(userExists);
        } else
        salvaDados()
}
            async function salvaDados(){

            //Extrai name, bio, e avatar do userInfo
            const {name, bio, avatar  } = userInfo;
            //Seta os valores para os campos no banco de dados
            const dev = await Dev.create({ user : username.toLowerCase(), name, bio, avatar });
            //Retorna o resultado do banco de dados
            return res.json(dev);
        }
        userExists() 
        
                
        
        })
       
        }

}
