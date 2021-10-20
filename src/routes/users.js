const router = require('express').Router();
const uuid = require('uuid').v4;

const { User } = require('./../models');

router.get('/', async (req, res) => {
  const users = await User.find().lean();
  if (!users) return res.status(404).json({ message: 'Users Not Found!' });

  return res.status(200).json({ data: users });
});

router.get('/:id', async (req, res) => {
  // Parsing Id From The Request (users/:id)
  const id = req.params.id;

  const existedUser = await User.findOne({ id }).lean();
  if (!existedUser)
    return res.status(404).json({ message: `User ${id} Not Found!` });

  return res.status(200).json({ data: existedUser });
});

router.post('/', async (req, res) => {
  // Parsing Fields From The Request
  const { email, name } = req.body;

  // Checking User By Email
  const existedUser = await User.findOne({ email }).lean();
  if (existedUser)
    return res.status(403).json({ message: `User ${email} Already Exist!` });

  // Creating User
  const createdUser = await User.create({ id: uuid(), email, name });
  if (!createdUser)
    return res.status(403).json({ message: 'User Not Created!' });

  return res.status(200).json({ message: 'User Created!', data: createdUser });
});

module.exports = router;
