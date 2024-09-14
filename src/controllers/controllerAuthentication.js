const { connection, dataSource } = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Biblioteca para cifrar contraseñas.
 
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
        const { userId, password } = req.body;
        const repository = dataSource.getRepository("user");
        
        if (!userId || !password ) {
            return res.status(400).json({ error: 'Se requiere el ID del administrador y la contraseña.' });
        }
        // Buscar el usuario por ID de administrador
        const user = await repository.findOne({ where: { userId: userId } });
        if (!user) {
            return res.status(401).json({ error: 'Usuario incorrecto' });
        }
        const userTypeRepository = dataSource.getRepository("UserType");
        const userType = await userTypeRepository.findOne({ where: { userTypeId: user.userTypeId } });
        if (!userType) {
            return res.status(401).json({ error: 'No se ha encontrado el rol del usuario' });
        }
        // Verificar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        // Si la contraseña es correcta, enviar mensaje de éxito y datos del administrador
        res.json({ message: 'Login exitoso', });
    } catch (error) {
        console.error('Error al realizar el login:', error);
        res.status(500).json({ error: 'Error al realizar el login' });
    }
};
