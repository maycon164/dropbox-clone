class DropBoxController{

    constructor(){
        
        this.btnSendFilesEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalBar = document.querySelector('#react-snackbar-root');

        this.initEvents();

    }

    initEvents(){
        
        this.btnSendFilesEl.addEventListener('click', event => {
            this.inputFilesEl.click();
        });

        //Pega os arquivos do nosso input e manda para upload
        this.inputFilesEl.addEventListener('change', event => {
            
            this.uploadFilesTask(event.target.files).then(resp => console.log(resp));

            this.snackModalBar.style.display = 'block';
        });
    }

    uploadFilesTask(files){
        let filesPromises = [];

        [...files].forEach(file => {

            filesPromises.push( new Promise( (resolve, reject) => {
                
                
                    let ajax = new XMLHttpRequest();
                    
                    ajax.open('POST', '/upload');
    
                    ajax.onload = event => {
                        
                        try{
                            resolve(JSON.parse(ajax.responseText));
                        }catch(error){
                            reject(error);
                        }
    
                    }
    
                    ajax.onerror = error => reject(error);
    
                    let formData = new FormData();
                    formData.append('input-file', file);
                    
                    ajax.send(formData);
            }));
        });

        return Promise.all(filesPromises);
    }

}