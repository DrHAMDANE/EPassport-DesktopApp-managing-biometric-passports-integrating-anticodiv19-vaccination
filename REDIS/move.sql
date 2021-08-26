SELECT CONCAT(
"*20\n",
'$',LENGTH(redis_cmd),'\n',redis_cmd,'\n','$',LENGTH(redis_key),'\n',redis_key,'\n',
'$',LENGTH(hkey1),'\n',hkey1,'\n','$',LENGTH(hval1),'\n',hval1,'\n'
'$',LENGTH(hkey2),'\n',hkey2,'\n','$',LENGTH(hval2),'\n',hval2,'\n'
'$',LENGTH(hkey3),'\n',hkey3,'\n','$',LENGTH(hval3),'\n',hval3,'\n'
'$',LENGTH(hkey4),'\n',hkey4,'\n','$',LENGTH(hval4),'\n',hval4,'\n'
'$',LENGTH(hkey5),'\n',hkey5,'\n','$',LENGTH(hval5),'\n',hval5,'\n'
'$',LENGTH(hkey6),'\n',hkey6,'\n','$',LENGTH(hval6),'\n',hval6,'\n'
'$',LENGTH(hkey7),'\n',hkey7,'\n','$',LENGTH(hval7),'\n',hval7,'\n'
'$',LENGTH(hkey8),'\n',hkey8,'\n','$',LENGTH(hval8),'\n',hval8,'\n'
'$',LENGTH(hkey9),'\n',hkey9,'\n','$',LENGTH(hval9),'\n',hval9)
FROM(
SELECT
'HMSET'AS redis_cmd,CONCAT('info_civil',id)AS redis_key,
'nom'AS hkey1,nom AS hval1,
'prenom'AS hkey2,prenom AS hval2,
'dateN'AS hkey3,dateN AS hval3,
'lieuN'AS hkey4,lieuN AS hval4,
'sexe'AS hkey5,sexe AS hval5,
'groupage'AS hkey6,groupage AS hval6,
'autorite'AS hkey7,autorite AS hval7,
'dateD'AS hkey8,dateD AS hval8,
'dateE'AS hkey9,dateE AS hval9
FROM civil_state
)AS t