const RNFS = require('react-native-fs');

const getfile = async (data) => {
    const fileName = data;
    const reader = await RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/Download/`);
    let folder = ""
    let videopath = ""
    reader.map(x => {
        if(x.isDirectory){
            const folder_name = x?.path.split('/');
            if(folder_name[folder_name.length - 1].toLowerCase().includes(fileName.toLowerCase())){
                folder = `${RNFS.ExternalStorageDirectoryPath}/Download/${folder_name[folder_name.length - 1]}/`
            }

        }
    })
    const files = await RNFS.readDir(folder);
    files.map(x => {
        if(x.isFile){
            const file_type = x?.path.split('.')[ x?.path.split('.').length - 1];
            if(file_type== "mp4" || file_type== "mkv" || file_type== "avi" || file_type== "mov" || file_type== "flv" || file_type== "wmv" || file_type== "mpg" || file_type== "mpeg"){
                videopath = `${folder}${x?.name}`
            }
        }
    })
    return videopath;
}

export default getfile