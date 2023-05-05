import { resolve } from 'path'
import multer from 'multer'
import { randomBytes } from 'crypto'

const folterTemp = resolve(__dirname, '..', '..', 'public/assets')

export default {
    storage: multer.diskStorage({
        destination: folterTemp,
        filename: (request, file, calback) => {
            const fileHash = randomBytes(16).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`
            return calback(null, fileName)
        }
    })
}