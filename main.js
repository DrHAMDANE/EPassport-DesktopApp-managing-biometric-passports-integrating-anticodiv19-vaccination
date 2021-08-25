function showAdd(){
    document.getElementById('container2').style.display="none";
    document.getElementById('container3').style.display="none";
    document.getElementById('container4').style.display="none";
    document.getElementById('container6').style.display="none";
    document.getElementById('container1').style.display="block";
    const content = document.getElementById("container1").innerHTML;
    document.getElementById("container1").innerHTML = content;
    document.getElementById('msg').style.display='none';
    document.getElementById('adda').style.background='#2e8565'
    document.getElementById('edita').style.background='none'
    document.getElementById('deletea').style.background='none'
    document.getElementById('vaca').style.background='none';
    document.getElementById('abouta').style.background='none';
    document.getElementById('display-photo').removeAttribute('src')
    document.getElementById('display-signature').removeAttribute('src')
}
function showEdit(){
    document.getElementById('container1').style.display="none";
    document.getElementById('container3').style.display="none";
    document.getElementById('container4').style.display="none";
    document.getElementById('container6').style.display="none";
    document.getElementById('container2').style.display="block";
    const content = document.getElementById("container2").innerHTML;
    document.getElementById("container2").innerHTML = content;
    document.getElementById('msg').style.display='none';
    document.getElementById('edita').style.background='#2e8565'
    document.getElementById('adda').style.background='none'
    document.getElementById('deletea').style.background='none'
    document.getElementById('vaca').style.background='none'
    document.getElementById('abouta').style.background='none'
    
    document.getElementById("display-photo2").removeAttribute('src')
    document.getElementById("display-signature2").removeAttribute('src')
}
function showDelete(){
    document.getElementById('container2').style.display="none";
    document.getElementById('container1').style.display="none";
    document.getElementById('container4').style.display="none";
    document.getElementById('container6').style.display="none";
    document.getElementById('container3').style.display="block";
    const content = document.getElementById("container3").innerHTML;
    document.getElementById("container3").innerHTML = content;
    document.getElementById('msg').style.display='none';
    document.getElementById('deletea').style.background='#2e8565'
    document.getElementById('edita').style.background='none'
    document.getElementById('adda').style.background='none'
    document.getElementById('vaca').style.background='none'
    document.getElementById('abouta').style.background='none'
    document.getElementById("display-photo3").removeAttribute('src')
    document.getElementById("display-signature3").removeAttribute('src')
}
function showVac(){
    document.getElementById('container2').style.display="none";
    document.getElementById('container3').style.display="none";
    document.getElementById('container1').style.display="none";
    document.getElementById('container6').style.display="none";
    document.getElementById('container4').style.display="block";
    const content = document.getElementById("container4").innerHTML;
    document.getElementById("container4").innerHTML = content;
    document.getElementById('msg').style.display='none';
    document.getElementById('vaca').style.background='#2e8565'
    document.getElementById('edita').style.background='none'
    document.getElementById('deletea').style.background='none'
    document.getElementById('adda').style.background='none'
    document.getElementById('abouta').style.background='none'
    
    document.getElementById("display-photo4").removeAttribute('src')
}
function showAbout(){
    document.getElementById('container2').style.display="none";
    document.getElementById('container3').style.display="none";
    document.getElementById('container4').style.display="none";
    document.getElementById('container1').style.display="none";
    document.getElementById('container6').style.display="block";
    document.getElementById('msg').style.display='none';
    document.getElementById('abouta').style.background='#2e8565'
    document.getElementById('edita').style.background='none'
    document.getElementById('deletea').style.background='none'
    document.getElementById('vaca').style.background='none'
    document.getElementById('adda').style.background='none'
}

async function showPhoto(){
    var photo = await eel.askPhoto()(callBack1);
}
function callBack1(result){
    document.getElementById('display-photo').src=result;
}
async function showSignature(){
    var signature = await eel.askSignature()(callBack2);
}
function callBack2(result){
    document.getElementById('display-signature').src=result;
}
function add(){
    var id=document.getElementById('id').value;
    var firstname=document.getElementById('firstname').value;
    var lastname=document.getElementById('lastname').value;
    var birthplace=document.getElementById('birthplace').value;
    var birth=document.getElementById('birthdate').value;
    var sexe= document.querySelector('input[name=gender]:checked').value;
    
    var groupage=document.getElementById('groupage').value;
    var autorite=document.getElementById('autorite').value;
    
    eel.add(id,firstname,lastname,birth,birthplace,sexe,groupage,autorite)(callBackAdd)   
}
function callBackAdd(result){
    var status=result[0],msg=result[1]
    document.getElementById('msg').style.display='block';
    if (status=='ko'){document.getElementById('msg').style.background='#c700009e'}
    else{document.getElementById('msg').style.background='#0de80d99'}
    document.getElementById('msgp').innerText=msg
}
function rechercher(){
    var id = document.getElementById('id2').value
    eel.rechercher(id)(callBacksearch)
}
async function showPhotoUp(){
    var photo = await eel.askPhotoUp()(callBack11);
}
function callBack11(result){
    document.getElementById('display-photo2').src=result;
}
async function showSignatureUp(){
    var signature = await eel.askSignatureUp()(callBack22);
}
function callBack22(result){
    document.getElementById('display-signature2').src=result;
}
function callBacksearch(result){
    if (result[0]=='ko'){
        document.getElementById('msg').style.display='block';
        document.getElementById('msg').style.background='#c700009e'
        document.getElementById('msgp').innerText=result[1]
    }
    else{
        if(result[0]=='yes'){
            document.getElementById('msg').style.display='block';
            document.getElementById('msg').style.background='#c700009e'
            document.getElementById('msgp').innerText='This passport is expired'
            document.getElementById('renew').style.display='block'
        }
        result=result[1]
        document.getElementById('msg').style.display='none'
    document.getElementById('firstname2').value=result['prenom']
    document.getElementById('lastname2').value=result['nom']
    document.getElementById('birthdate2').value=result['dateN']
    document.getElementById('birthplace2').value=result['lieuN']
    if(result['sexe']=='homme' || result['sexe']=='Homme'){
        document.getElementById('male2').checked=true;document.getElementById('female2').disabled=true}
    else{document.getElementById('female2').checked=true;document.getElementById('male2').disabled=true}
    document.getElementById('groupage2').value=result['groupage']
    document.getElementById('autorite2').value=result['autorite']
    document.getElementById('display-photo2').src='photo.png'
    document.getElementById('display-signature2').src='signature.png'
}}

function edit(){
    var id=document.getElementById('id2').value;
    var autorite=document.getElementById('autorite').value;
    
    eel.edit(id,autorite)(callBackedit)   
}

function renewfunc(){
    var id=document.getElementById('id2').value;
    var autorite=document.getElementById('autorite').value;
    eel.renew(id,autorite)(callBackRenew)
}

function callBackRenew(result){
    var status=result[0],msg=result[1]
    document.getElementById('msg').style.display='block';
    if (status=='ko'){document.getElementById('msg').style.background='#c700009e'}
    else{document.getElementById('msg').style.background='#0de80d99'}
    document.getElementById('msgp').innerText=msg
}


function callBackedit(result){
    var status=result[0],msg=result[1]
    document.getElementById('msg').style.display='block';
    if (status=='ko'){document.getElementById('msg').style.background='#c700009e'}
    else{document.getElementById('msg').style.background='#0de80d99'}
    document.getElementById('msgp').innerText=msg
}

function rechercherSup(){
    var id = document.getElementById('id3').value
    eel.rechercher(id)(callBacksearchsup)
}

function callBacksearchsup(result){
    if (result[0]=='ko'){
        document.getElementById('msg').style.display='block';
        document.getElementById('msg').style.background='#c700009e'
        document.getElementById('msgp').innerText=result[1]
    }
    else{
        if(result[0]=='yes'){
            document.getElementById('msg').style.display='block';
            document.getElementById('msg').style.background='#c700009e'
            document.getElementById('msgp').innerText='This passport is expired'
            document.getElementById('renew').style.display='block'
        }
        result=result[1]
        document.getElementById('msg').style.display='none'
    document.getElementById('firstname3').value=result['prenom']
    document.getElementById('lastname3').value=result['nom']
    document.getElementById('birthdate3').value=result['dateN']
    document.getElementById('birthplace3').value=result['lieuN']
    if(result['sexe']=='homme' || result['sexe']=='Homme'){
        document.getElementById('male3').checked=true;document.getElementById('female3').disabled=true}
    else{document.getElementById('female3').checked=true;document.getElementById('male3').disabled=true}
    document.getElementById('groupage3').value=result['groupage']
    document.getElementById('autorite3').value=result['autorite']
    document.getElementById('display-photo3').src='photo.png'
    document.getElementById('display-signature3').src='signature.png'
}}

function remove(){
    var id = document.getElementById('id3').value
    eel.remove(id)(callBackremove)
}
function callBackremove(result){
    var status=result[0],msg=result[1]
    document.getElementById('msg').style.display='block';
    if (status=='ko'){document.getElementById('msg').style.background='#c700009e'}
    else{document.getElementById('msg').style.background='#0de80d99'}
    document.getElementById('msgp').innerText=msg
}

function recherchervac(){
    var id = document.getElementById('id4').value
    eel.searchvac(id)(callBackvac)
}
function callBackvac(result){
    data=result
    document.getElementById('firstname4').value=data['prenom']
    document.getElementById('lastname4').value=data['nom']
    document.getElementById('birthdate4').value=data['dateN']
    document.getElementById('birthplace4').value=data['lieuN']
    document.getElementById('gender4').value=data['sexe'];
    document.getElementById('groupage4').value=data['groupage']
    document.getElementById('autorite4').value=data['autorite']
    document.getElementById('display-photo4').src='photo.png'
}

function addvac(){
    var id = document.getElementById('id4').value
    var num = document.getElementById('vacNum').value
    var nom = document.getElementById('vacName').value
    var dateexp = document.getElementById('dateExp').value
    var datepro = document.getElementById('datePro').value
    var datevac = document.getElementById('dateVac').value
    var desc = document.getElementById('description').value
    var lot = document.getElementById('lot').value
    var provider = document.getElementById('provider').value
    var tech = document.getElementById('technique').value
    var type = document.getElementById('type').value

    eel.addvac(id,num,nom,dateexp,datepro,datevac,desc,lot,provider,tech,type)(callBackaddvac)
}
function callBackaddvac(result){
    var status=result[0],msg=result[1]
    document.getElementById('msg').style.display='block';
    if (status=='ko'){document.getElementById('msg').style.background='#c700009e'}
    else{document.getElementById('msg').style.background='#0de80d99'}
    document.getElementById('msgp').innerText=msg
}

