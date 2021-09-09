class DropBoxController{

    constructor(){
        
        this.btnSendFilesEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');

        //BARRA DE PROGRESSO
        this.snackModalBar = document.querySelector('#react-snackbar-root');

        this.fileName = this.snackModalBar.querySelector('.filename');
        this.timeLeft = this.snackModalBar.querySelector('.timeleft');
        this.barProgress = this.snackModalBar.querySelector('.mc-progress-bar-fg');


        this.initEvents();

    }

    initEvents(){
        
        this.btnSendFilesEl.addEventListener('click', event => {
            this.inputFilesEl.click();
        });

        //Pega os arquivos do nosso input e manda para upload
        this.inputFilesEl.addEventListener('change', event => {
            
            this.uploadFilesTask(event.target.files).then(resp => console.log(resp));
            this.modalShow();
            this.inputFilesEl.value = '';
            
        });
    }

    modalShow(show = true){
        this.snackModalBar.style.display = (show) ? "block" : "none";
    }

    uploadFilesTask(files){
        let filesPromises = [];

        [...files].forEach(file => {

            filesPromises.push( new Promise( (resolve, reject) => {
                
                
                    let ajax = new XMLHttpRequest();
                    
                    ajax.open('POST', '/upload');
    
                    ajax.onload = event => {
                        this.modalShow(false);
                        try{
                            resolve(JSON.parse(ajax.responseText));
                        }catch(error){
                            
                            reject(error);
                        }
    
                    }

                    ajax.upload.onprogress = event => {
                        
                        this.uploadProgress(event, file);
                        this.startTimeUpload = Date.now();

                    }
    
                    ajax.onerror = error => {
                        this.modalShow();  
                        reject(error);
                    }
    
                    let formData = new FormData();
                    formData.append('input-file', file);
                    
                    ajax.send(formData);
            }));
        });

        return Promise.all(filesPromises);
    }

    uploadProgress(event, file){

        let timeSpent = Date.now() - this.startTimeUpload;

        let loaded = event.loaded;
        let total = event.total;
    
        let percent = parseInt((loaded / total) * 100);
    
        let timeLeft = ((100 - percent) * timeSpent) / percent;

        console.log(timeSpent, timeLeft, percent);

        this.barProgress.style.width = `${percent}%`;
        this.fileName.innerHTML = file.name;
        this.timeLeft.innerHTML = this.timeToHuman(timeLeft);

    }

    timeToHuman(duration){
        
        let seg = parseInt((duration / 1000) % 60);
        let min = parseInt( (duration / (1000 * 60)) % 60);
        let hour = parseInt( (duration / (1000 * 60 * 60) ) % 24);
        
        if(hour > 0){ 
            return `${hour} horas ${min} minutos e ${seg} segundos`;
        }
        if(min > 0) {
            return `${min} minutos e ${seg} segundos`;
        }
        if(seg > 0){ 
            return `${seg} segundos`;
        }
        return `${hour} horas ${min} minutos e ${seg} segundos`;
    }
}