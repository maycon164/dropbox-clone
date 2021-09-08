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

        this.inputFilesEl.addEventListener('change', event => {
            console.log(event.target.files);
            this.snackModalBar.style.display = 'block';
        });
    }


}