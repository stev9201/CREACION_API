
// Define una ruta POST en el router. Esta ruta permite crear un nuevo "post".
Router.post('/', async (req, res) => {

    // Crea una nueva instancia del modelo 'post' con los datos del cuerpo de la solicitud.
    const post = new post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        // Intenta guardar el nuevo post en la base de datos y devuelve el post guardado como respuesta en formato JSON.
        const savedPost = await post.save();
        res.json(savedPost);

    } catch (error) {
        // Si ocurre un error, devuelve el mensaje de error en formato JSON.
        res.json({message: error});
    }
    
});


// Define una ruta GET que permite obtener un post específico por su ID.
router.get ('/:postId', async (req, res) => {
    try {
        // Intenta encontrar el post por ID y devolverlo como respuesta en formato JSON.
        const post = await postfindById(req.params.postId);
        res.json(post)
    } catch (error) {
        // Si ocurre un error, devuelve el mensaje de error en formato JSON.
        res.json({message: error});
    }
});


// Define una ruta DELETE que permite eliminar un post específico por su ID.
router.delete ('/postId', async (req, res) => {
    try{
        // Intenta eliminar el post por ID y devolver un mensaje de confirmación en formato JSON.
       const removedPost = await Post.remove({_id: req.params.postId});
    } catch (error) {
        // Si ocurre un error, devuelve el mensaje de error en formato JSON.
      res.json({messaje: error}); 
    }
});


// Define una ruta PATCH que permite actualizar un post específico por su ID.
router.patch('/:postId', async (req, res) => {
    try{
        // Intenta actualizar el post por ID con los datos proporcionados en el cuerpo de la solicitud y devolver el resultado en formato JSON.
     const updatePost = await Post.updateOne(
      {_id: req.params.postId},
      {$set: {title:req.body.title}});
      res.json(updatePost); 
    } catch (error) {
        // Si ocurre un error, devuelve el mensaje de error en formato JSON.
        res.json({message: error});
    }
});

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación.
Module.exports = router;