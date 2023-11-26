import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'

const MyNotification = (newtitle, newmessage, newtype) => {
    ElNotification({
        title: newtitle,
        message: newmessage,
        type: newtype,
        duration: 2000
    })
}

const MyMessage = (newmessage, newtype) => {
    ElMessage({
        message: newmessage,
        type: newtype,
        duration: 2000,
        showClose: true
    })
}
const MyConfirmElMessageBox = (content, type, done) => {
    ElMessageBox.confirm(
        content,
        type,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        done()
    }).catch(() => {
    })
}

export { MyNotification, MyMessage, MyConfirmElMessageBox }
//import { MyNotification,MyMessage } from '@/plugins/Message.js'