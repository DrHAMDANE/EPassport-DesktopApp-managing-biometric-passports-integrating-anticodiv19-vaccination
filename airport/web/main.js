

function recherchervac(){
    document.getElementById('modfvac').innerHTML=''
    document.getElementById('msg').style.display='none';

    var id = document.getElementById('id4').value
    eel.searchvac(id)(callBackvac)
}
function callBackvac(result){
    if (result[0][0]=='ko'){
        document.getElementById('msg').style.display='block';
        document.getElementById('msg').style.background='#c700009e'
        document.getElementById('msgp').innerText=result[0][1]
    }
    if(result.length>1){
        data=result[1]
        document.getElementById('firstname4').value=data['nom']
        document.getElementById('lastname4').value=data['prenom']
        document.getElementById('birthdate4').value=data['dateN']
        document.getElementById('birthplace4').value=data['lieuN']
        document.getElementById('gender4').value=data['sexe'];
        document.getElementById('groupage4').value=data['groupage']
        document.getElementById('autorite4').value=data['autorite']
        document.getElementById('display-photo').src='photo.png'
        document.getElementById('display-signature').src='signature.png'
    }
    if(result.length>2){
        
        document.getElementById('modfvac').style.display='inline-block'
        for(i=2;i<=result.length;i++){
            var vac=result[i]
            document.getElementById('modfvac').innerHTML+='<h2>'+vac["type"]+':</h2> <label>Vaccination Name:</label><input type="text" name="vacName" value="'+vac['nom_vac']+'" disabled><label>Lot: </label><input type="text" name="lot" value="'+vac['lot']+'" disabled><br><label>Technique:</label><input type="text" name="technique" value="'+vac["technique"] +'" disabled ><label>Production Date: </label><input type="text" name="datePro" value="'+vac["date_pro"]+'" disabled><br><label>Expiration Date: </label><input type="text" value="'+vac["date_exp"]+'" disabled><label>Vaccination Date: </label><input type="text" value="'+vac["date_vac"]+'" disabled><br><label>Provider: </label><input type="text" value="'+vac["provider"]+'" disabled><label>Description: </label><input type="text" value="'+vac["description"]+'" disabled>'
        }
    }
}

