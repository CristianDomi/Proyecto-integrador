const  Facenet  = require('facenet')  // from 'facenet'
  /*import {
    saveImage,
  }                   from '../src/misc'
  */
  // import { log }      from '../'
  // log.level('silly')
  console.log('hola')
  async function main() {
    // Instanciate FaceNet
    const facenet = new Facenet.Facenet()
  
    // Init TensorFlow Backend:
    //  This is very slow for the first time initialization,
    //  which will take 15 - 100 seconds on different machines.
    await facenet.init()
  
    try {
      // Load image from file
     // console.log(__dirname)
      const imageFile = `${__dirname}/two-faces.jpg`
  
      // Do Face Alignment, return faces
      const faceList = await facenet.align(imageFile)
  
      for (const face of faceList) {
        // Calculate Face Embedding, return feature vector
        face.embedding = await facenet.embedding(face)
  
        const faceFile = `${face.md5}.png`
        if (face.imageData) {
        //  saveImage(face.imageData, faceFile)
        } else {
          console.error('face no image data!')
        }
  
        console.log('image file:',    imageFile)
        console.log('face file:',     faceFile)
        console.log('confidence:',    face.confidence)
        console.log('bounding box:',  face.location)
        console.log('landmarks:',     face.landmark)
        console.log('embedding:',     face.embedding)

        //faceList[0].embedding = await facenet.embedding(faceList[0])
        //faceList[1].embedding = await facenet.embedding(faceList[1])
        
      }
        console.log('distance between the different face: ', faceList[0].distance(faceList[1]))
        console.log('distance between the same face:      ', faceList[0].distance(faceList[0]))

        for (const face of faceList) {
          await face.save(face.md5 + '.jpg')
          console.log(`save face ${face.md5} successfuly`)
        }
        console.log(`Save ${faceList.length} faces from the imageFile`)

        
    } finally {
      facenet.quit()
    }
  }

  
  
  main()
  .catch(console.error)