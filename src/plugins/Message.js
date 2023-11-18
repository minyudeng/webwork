import { ElNotification, ElMessageBox,ElMessage } from 'element-plus'

const MyNotification =(newtitle, newmessage,newtype)=>{
    ElNotification({
        title: newtitle,
        message:newmessage,
        type: newtype,
        duration: 2000
    })
}

const MyMessage =(newmessage,newtype)=>{
    ElMessage({
        message: newmessage,
        type: newtype,
        duration: 2000,
        showClose: true
      })
}

export {MyNotification,MyMessage}
//import { MyNotification,MyMessage } from '@/plugins/Message.js'