var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/items', async (req, res) => {
    try {
      const item = await db.collection('items').find({}).toArray();
      res.send(item);
    } catch (err) {
      console.log(err);
      res.send({ 'error': 'An error has occurred' });
    }
  });

  app.get('/items/:id', async (req, res) => {
    const id = req.params.id;

    try {
      const details = { '_id': new ObjectID(id) };
      const item = await db.collection('items').findOne(details);
      res.send(item);
    } catch (err) {
      console.log(err);
      res.send({ 'error': 'An error has occurred' });
    }
  });

  app.delete('/items/:id', async(req, res) => {
    const id = req.params.id;

    try {
      const details = { '_id': new ObjectID(id) } ;
      const item = await db.collection('items').remove(details);
      res.send('Item ' + id + ' deleted');
    } catch(err) {
      console.log(err);
      res.send({ 'error': 'An error has occurred' });
    }
  });

  app.put('/items/:id', async (req, res) => {
    const id = req.params.id;
    const Item = {
      title: req.body.title,
      openedwhen: req.body.openedwhen,
      usewithin: req.body.usewithin
    };

    try {
      const details = { '_id': new ObjectID(id) };
      const item = await db.collection('items').update(details, Item);
      res.send(item);
    } catch (err) {
      console.log(err);
      res.send({ 'error': 'An error has occurred' });
    }
  });

  app.post('/items', async (req, res) => {
    const Item = {
      title: req.body.title,
      openedwhen: req.body.openedwhen,
      usewithin: req.body.usewithin
    };

    try {
      const results = await db.collection('items').insert(Item);
      res.send(results.ops[0]);
    } catch (err) {
      res.send({ 'error': 'An error has occurred' });
    }
  });
}
