const { connection, dataSource } = require('../database');
const jwt = require('jsonwebtoken');//biblioteca para crear token
const bcrypt = require('bcrypt'); // Biblioteca para cifrar contraseñas.
const dotenv = require('dotenv');
const user = require('../entities/entityUser');
dotenv.config();

 
async function hashPassword(password) {
  const saltRounds = 10; //
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw new Error('Error al encriptar la contraseña');
  }
}
 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const repository = dataSource.getRepository("user");
        
        if (!email || !password ) {
            return res.status(400).json({ error: 'Se requiere el email del usuario y la contraseña.' });
        }
        // Buscar el email
        const user = await repository.findOne({ where: { email: email} });
        if (!user) {
            return res.status(401).json({ error: 'Usuario incorrecto' });
        }
        //Verificar el tipo de usuario
        const userTypeRepository = dataSource.getRepository("userType");
        const userType = await userTypeRepository.findOne({ where: { userTypeId: user.userTypeId } });
        if (!userType) {
            return res.status(401).json({ error: 'No se ha encontrado el rol del usuario' });
        }

        // Verificar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
       const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        console.log(userType.userTypeName)
        
        //Se agrega el token
        var token = jwt.sign({role:userType.userTypeName}, process.env.jwtsecret)
        // Si el email y la contraseña es correcta, enviar mensaje de éxito 
        res.json({ message: 'Login exitoso', token});
    } catch (error) {
        console.error('Error al realizar el login:', error);
        res.status(500).json({ error: 'Error al realizar el login' });
    }
};

const createUser = async (req, res) => {
    try {
        const {email, password} = req.body;
       
        const user= {email, password };
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        const repositorio = dataSource.getRepository("user");
        user.userTypeId = 2;
        await repositorio.save(user)
        res.json({ msg: "usuario agregado" });

    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(400).json({ error: ''});
    }
}
 

module.exports = {
    login,
    createUser
};