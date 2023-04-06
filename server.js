const mongoose = require('mongoose');

const app = require('./app');
// FkYm1pLSRdZL19bI
const DB_HOST = 'mongodb+srv://Oleksandr:FkYm1pLSRdZL19bI@cluster0.zni0pjr.mongodb.net/contacts_app?retryWrites=true&w=majority'

mongoose.connect(DB_HOST)
.then(()=> app.listen(3000))
.catch(error => console.log(error.message));

// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });
