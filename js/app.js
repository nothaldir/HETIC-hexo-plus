// Objets défilants A. Bontemps, abciweb.net Version 2.2
function DF_ObjetDefilant(id,id_dim,mode,sens,vit,pos,b_esp,pause)
{
   this.DF_ObjetParam = typeof this.DF_ObjetParam == 'undefined' ? new Array() : this.DF_ObjetParam;   
   this.DF_ObjetParam[id] = typeof this.DF_ObjetParam[id] == 'undefined' ? new Array() : this.DF_ObjetParam[id];   
         
   if(typeof this.DF_ObjetParam[id]['id_defile'] == 'undefined') {Set_param (id,id_dim,mode,sens,vit,pos,b_esp,pause);}
   else
   if (this.DF_ObjetParam[id]['dim_defilant'] > 0)
   {
      if (this.DF_ObjetParam[id]['mode'] == 'r') {Boucle_ar(id);} else {Boucle_cont(id);}
   
      this.DF_ObjetParam[id]['Timer'] = setTimeout(function(){DF_ObjetDefilant(id)},this.DF_ObjetParam[id]['delaicrnt']);   
   }
   


   function Set_param (id,id_dim,mode,sens,vit,pos,b_esp,pause)
   {   
      var id_d = null;
      var id_c = null;
      var id_cc = null;
      
      
      if(!(id_d = document.getElementById(id))) {id_d = null;} else if(!(id_c = id_d.parentNode)) {id_c = null;}
      else if(!(id_cc = id_c.parentNode)) {id_cc = null;};
      
      if(id_c != null && id_cc != null && id_d != null)
      {
      function is_all_ws ( nod )
         {
           // Use ECMA-262 Edition 3 String and RegExp features
           return !(/[^\t\n\r ]/.test(nod.data));
         }
         
         
      function is_ignorable ( nod )
         {
           return (nod.nodeType == 8) || // A comment node
                ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
         }


      function trim_debut (myString)
         {
            return myString.replace(/^\s+/g,'')
         }
      
      
      function trim_fin (myString)
         {
            return myString.replace(/\s+$/g,'')
         }
      
                                 
      // Nettoyage mise en page html Mozilla Chrome...
      if (id_d != null)
         {
            while (id_d.hasChildNodes() && is_ignorable(id_d.lastChild)) {id_d.removeChild(id_d.lastChild);}
            while (id_d.hasChildNodes() && is_ignorable(id_d.firstChild)) {id_d.removeChild(id_d.firstChild);}
         }   
      }
      
      if(id_c != null && id_cc != null && id_d != null && id_d.hasChildNodes())
         {
            this.DF_ObjetParam[id]['instance'] = typeof this.DF_ObjetParam[id]['instance'] == 'undefined' ? function () {DF_ObjetDefilant(id,id_dim,mode,sens,vit,pos,b_esp,pause);} : this.DF_ObjetParam[id]['instance'];
            
            this.DF_ObjetParam[id]['sens_ini'] = typeof sens != 'undefined' && (sens == 'g' || sens == 'd' || sens == 'h' || sens == 'b') ? sens : 'g';
   
            this.DF_ObjetParam[id]['sens_horizontal'] = this.DF_ObjetParam[id]['sens_ini'] == 'g' || this.DF_ObjetParam[id]['sens_ini'] == 'd' ? true : false;   
            
            id_cc.style.overflow = "hidden";
            
            id_c.style.visibility = "hidden";
            id_c.style.position = "relative";
            id_c.style.overflow = "hidden";
            
                     
            id_d.style.position = "absolute";
            id_d.style.width = "auto";
            id_d.style.height = "auto";
            
            
            // Nettoyage espaces vides en début de défilant pour le mode horizontal
            var elem = id_d.firstChild;   
            
            if (elem.nodeType == 3 && this.DF_ObjetParam[id]['sens_horizontal'])
               {
                  var noeud_debut = document.createTextNode(trim_debut(elem.nodeValue));
                  id_d.replaceChild(noeud_debut, id_d.firstChild);
               }
      
            // Nettoyage espaces vides en fin de défilant
            elem = id_d.lastChild;   
            
            if (elem.nodeType == 3)
               {
                  var noeud_fin = document.createTextNode(trim_fin(elem.nodeValue));
                  id_d.replaceChild(noeud_fin, id_d.lastChild);
               }
            
            
            var div_defile = id_d.cloneNode(true);
            
            var espace_insecable = document.createTextNode("\u00a0");
            
            // Ajoute un espace insécable "\u00a0" si 'BR' est en fin de défilant pour le mode vertical (pour ie)
            if(!this.DF_ObjetParam[id]['sens_horizontal'] && div_defile.lastChild.nodeName == 'BR')
            {
               div_defile.appendChild(espace_insecable);
            }
   
            
            var c = document.createElement("div");
            c.style.height = "100%";
            
            var nb_noeud = id_c.childNodes.length;
            
            
            // Dimensions du cadre
            for (var i = 0; i < nb_noeud ; i++) {id_c.removeChild(id_c.firstChild);}
            id_c.appendChild(c);
            
            this.DF_ObjetParam[id]['hauteur_cadre'] = c.offsetHeight;
            this.DF_ObjetParam[id]['largeur_cadre'] = c.offsetWidth;
            id_c.removeChild(id_c.firstChild);
            id_c.appendChild(div_defile);         
               
            this.DF_ObjetParam[id]['id_defile'] = document.getElementById(id);
            
            
            // Dimensions du défilant   
            var id_dim = typeof id_dim == 'undefined' || trim_debut(id_dim) == '' || id_dim == 'auto' ? 'auto' :  parseInt(id_dim);
            
            if(this.DF_ObjetParam[id]['sens_horizontal'])
               {
                  this.DF_ObjetParam[id]['id_defile'].style.height = this.DF_ObjetParam[id]['hauteur_cadre']+'px';
                                    
                  this.DF_ObjetParam[id]['largeur_def'] = id_dim == 'auto' ? undefined : id_dim;
                  
                  if (typeof this.DF_ObjetParam[id]['largeur_def'] == 'undefined')
                  {
                     id_c.style.width = '1000000px';//largeur maxi de calcul
                     
                     this.DF_ObjetParam[id]['largeur_def'] = this.DF_ObjetParam[id]['id_defile'].offsetWidth;
                     
                     id_c.style.width = 'auto';
                  }
                  
                  this.DF_ObjetParam[id]['id_defile'].style.width = this.DF_ObjetParam[id]['largeur_def']+'px';
                  
               }
               else
               {
                  this.DF_ObjetParam[id]['id_defile'].style.width = this.DF_ObjetParam[id]['largeur_cadre']+'px';
                  
                  this.DF_ObjetParam[id]['hauteur_def'] = id_dim == 'auto' ? this.DF_ObjetParam[id]['id_defile'].offsetHeight : id_dim;
                  
                  this.DF_ObjetParam[id]['id_defile'].style.height = this.DF_ObjetParam[id]['hauteur_def']+'px';
               }



            this.DF_ObjetParam[id]['dim_cadre'] = this.DF_ObjetParam[id]['sens_horizontal'] ? this.DF_ObjetParam[id]['largeur_cadre'] : this.DF_ObjetParam[id]['hauteur_cadre'];
            
            this.DF_ObjetParam[id]['dim_defilant'] = this.DF_ObjetParam[id]['sens_horizontal'] ? this.DF_ObjetParam[id]['largeur_def'] : this.DF_ObjetParam[id]['hauteur_def'];
            
   
            this.DF_ObjetParam[id]['mode'] = typeof mode != 'undefined' && (mode == 'r' || mode == 'b') ? mode : 'b';
                     
            this.DF_ObjetParam[id]['vitesse'] = typeof vit != 'undefined' && parseInt(vit) > 0 ? parseInt(vit) : 20;
         
            this.DF_ObjetParam[id]['psinit'] = typeof pos != 'undefined' && parseFloat(pos) > 0 ? parseFloat(pos) : 0;
            
            this.DF_ObjetParam[id]['b_esp'] = typeof b_esp != 'undefined' && parseFloat(b_esp) > 0 ? parseFloat(b_esp) : 0;      
            
            this.DF_ObjetParam[id]['pause'] = typeof pause != 'undefined' && parseInt(pause) > 0 ? parseInt(pause) : 0;
                     
      
            this.DF_ObjetParam[id]['b_esp'] = this.DF_ObjetParam[id]['b_esp'] < 0  || this.DF_ObjetParam[id]['b_esp'] > 100 || this.DF_ObjetParam[id]['mode'] == 'r' ? 0 : Math.ceil(this.DF_ObjetParam[id]['b_esp'] * this.DF_ObjetParam[id]['dim_cadre']/100);
            
         
            this.DF_ObjetParam[id]['psinit'] = this.DF_ObjetParam[id]['psinit'] == 100 || this.DF_ObjetParam[id]['psinit'] < 0 || this.DF_ObjetParam[id]['psinit'] > 100 ? this.DF_ObjetParam[id]['dim_cadre'] : Math.ceil(this.DF_ObjetParam[id]['psinit']*this.DF_ObjetParam[id]['dim_cadre']/100);      
            
            
            this.DF_ObjetParam[id]['psinit'] = (this.DF_ObjetParam[id]['dim_cadre'] > this.DF_ObjetParam[id]['dim_defilant'] &&  this.DF_ObjetParam[id]['psinit'] == 0 ) ? this.DF_ObjetParam[id]['dim_cadre'] - this.DF_ObjetParam[id]['dim_defilant'] : this.DF_ObjetParam[id]['psinit'];
            
            
            this.DF_ObjetParam[id]['pscrnt'] = this.DF_ObjetParam[id]['psinit'];
            
            this.DF_ObjetParam[id]['sens'] = 1;
         
            this.DF_ObjetParam[id]['p_retour'] = this.DF_ObjetParam[id]['dim_defilant'] >= this.DF_ObjetParam[id]['dim_cadre'] ? this.DF_ObjetParam[id]['dim_defilant'] - this.DF_ObjetParam[id]['dim_cadre'] : 0;
            
            this.DF_ObjetParam[id]['dim_defilant'] += this.DF_ObjetParam[id]['b_esp'];                                          
         
            this.DF_ObjetParam[id]['p_retour'] = this.DF_ObjetParam[id]['mode'] == 'b' ? this.DF_ObjetParam[id]['dim_defilant'] : this.DF_ObjetParam[id]['p_retour'];
            
         
            if (this.DF_ObjetParam[id]['mode'] == 'r' && this.DF_ObjetParam[id]['dim_defilant'] == this.DF_ObjetParam[id]['dim_cadre'] && this.DF_ObjetParam[id]['psinit'] == 0) {this.DF_ObjetParam[id]['dim_defilant'] = 0;}
         
            if (this.DF_ObjetParam[id]['dim_defilant'] > 0 && this.DF_ObjetParam[id]['mode'] == 'b') {Ajout_clone(id);}
                        
            
            id_cc.style.overflow = "visible";
            id_c.style.visibility = "visible";   
            
         
            this.DF_ObjetParam[id]['instance']();   
      }
   }


   
   function Ajout_clone(id)
   {         
      var div_contenu = document.createElement("div");
      
      var nb_noeud = this.DF_ObjetParam[id]['id_defile'].childNodes.length;
      
      for (var i = 0; i < nb_noeud ; i++)
         {               
            div_contenu.appendChild(this.DF_ObjetParam[id]['id_defile'].firstChild.cloneNode(true));
            this.DF_ObjetParam[id]['id_defile'].removeChild(this.DF_ObjetParam[id]['id_defile'].firstChild);
         }
         
      if (this.DF_ObjetParam[id]['b_esp'] > 0)
      {
         if (this.DF_ObjetParam[id]['sens_horizontal'])
            {
               this.DF_ObjetParam[id]['sens_ini'] == 'g' ? div_contenu.style.paddingRight = this.DF_ObjetParam[id]['b_esp']+'px' : div_contenu.style.paddingLeft = this.DF_ObjetParam[id]['b_esp']+'px';      
            }
            else
            {
               this.DF_ObjetParam[id]['sens_ini'] == 'h' ? div_contenu.style.paddingBottom = this.DF_ObjetParam[id]['b_esp']+'px' : div_contenu.style.paddingTop = this.DF_ObjetParam[id]['b_esp']+'px';               
            }
      }
      
      if (this.DF_ObjetParam[id]['sens_horizontal']) {div_contenu.style.display = "inline";};               
            
      this.DF_ObjetParam[id]['id_defile'].appendChild(div_contenu.cloneNode(true));
            
      var nb_clone = Math.ceil(this.DF_ObjetParam[id]['dim_cadre']/(this.DF_ObjetParam[id]['dim_defilant']));
      
      if (this.DF_ObjetParam[id]['sens_horizontal'])
         {
            this.DF_ObjetParam[id]['id_defile'].style.width = ((nb_clone+1) * this.DF_ObjetParam[id]['dim_defilant'])+'px';
         }
         else
         {
            this.DF_ObjetParam[id]['id_defile'].style.height = ((nb_clone+1) * this.DF_ObjetParam[id]['dim_defilant'])+'px';
         }
         
      for (var j = 0; j < nb_clone ; j++)
         {
            this.DF_ObjetParam[id]['id_defile'].appendChild(this.DF_ObjetParam[id]['id_defile'].firstChild.cloneNode(true));   
         }
   }



   function Boucle_cont(id)
   {
      this.DF_ObjetParam[id]['delaicrnt'] = this.DF_ObjetParam[id]['vitesse'];
      this.DF_ObjetParam[id]['inverse'] = 1;
   
      if(this.DF_ObjetParam[id]['pscrnt'] == - this.DF_ObjetParam[id]['p_retour'])   
            {               
               this.DF_ObjetParam[id]['id_defile'].appendChild(this.DF_ObjetParam[id]['id_defile'].firstChild.cloneNode(true)); 
               this.DF_ObjetParam[id]['id_defile'].removeChild(this.DF_ObjetParam[id]['id_defile'].firstChild);
               
               this.DF_ObjetParam[id]['inverse'] = -1;      
               this.DF_ObjetParam[id]['pscrnt'] = 0;
               this.DF_ObjetParam[id]['sens'] = -1;      
            }      
            else
            {
               if(this.DF_ObjetParam[id]['pscrnt'] == this.DF_ObjetParam[id]['psinit'])
                  {
                     this.DF_ObjetParam[id]['sens'] *= -1;
                     this.DF_ObjetParam[id]['delaicrnt'] = this.DF_ObjetParam[id]['pause'];
                  }
            }
            
         if (this.DF_ObjetParam[id]['sens_horizontal'])
            {
               this.DF_ObjetParam[id]['sens_ini'] == 'g' ? this.DF_ObjetParam[id]['id_defile'].style.left = this.DF_ObjetParam[id]['pscrnt']+"px" : this.DF_ObjetParam[id]['id_defile'].style.right = this.DF_ObjetParam[id]['pscrnt']+"px" ;
            }
            else
            {
               this.DF_ObjetParam[id]['sens_ini'] == 'h' ? this.DF_ObjetParam[id]['id_defile'].style.top = this.DF_ObjetParam[id]['pscrnt']+"px" : this.DF_ObjetParam[id]['id_defile'].style.bottom = this.DF_ObjetParam[id]['pscrnt']+"px" ;
            }
         
         this.DF_ObjetParam[id]['pscrnt'] += this.DF_ObjetParam[id]['sens'];
   }
   
   
   
   function Boucle_ar (id)
   {
      this.DF_ObjetParam[id]['delaicrnt'] = this.DF_ObjetParam[id]['vitesse'];
      this.DF_ObjetParam[id]['inverse'] = 1;
      
      if(this.DF_ObjetParam[id]['pscrnt']  == - this.DF_ObjetParam[id]['p_retour'] || this.DF_ObjetParam[id]['pscrnt'] == this.DF_ObjetParam[id]['psinit'])
         {
            this.DF_ObjetParam[id]['inverse'] = -1;
            this.DF_ObjetParam[id]['delaicrnt'] = this.DF_ObjetParam[id]['pause'];
            this.DF_ObjetParam[id]['sens'] *= -1;
         }
         
      if (this.DF_ObjetParam[id]['sens_horizontal'])
         {      
            this.DF_ObjetParam[id]['sens_ini'] == 'g' ? this.DF_ObjetParam[id]['id_defile'].style.left = this.DF_ObjetParam[id]['pscrnt']+"px" : this.DF_ObjetParam[id]['id_defile'].style.right = this.DF_ObjetParam[id]['pscrnt']+"px" ;
         }
         else
         {
            this.DF_ObjetParam[id]['sens_ini'] == 'h' ? this.DF_ObjetParam[id]['id_defile'].style.top = this.DF_ObjetParam[id]['pscrnt']+"px" : this.DF_ObjetParam[id]['id_defile'].style.bottom = this.DF_ObjetParam[id]['pscrnt']+"px" ;

         }
      
      this.DF_ObjetParam[id]['pscrnt'] += this.DF_ObjetParam[id]['sens'];
   }

}



function DF_ObjetNavigMous(id,etat,nb)
{
   var nb = typeof nb == 'undefined'? 0 :  nb + 1;
   
   if(typeof this.DF_ObjetParam != 'undefined' && typeof this.DF_ObjetParam[id] != 'undefined' && this.DF_ObjetParam[id]['id_defile'] != null && typeof this.DF_ObjetParam[id]['instance'] != 'undefined' && typeof this.DF_ObjetParam[id]['Timer'] == 'number')
      {
         clearTimeout(this.DF_ObjetParam[id]['Timer']);
         this.DF_ObjetParam[id]['Timer'] = 0;
         if (etat == 'out') this.DF_ObjetParam[id]['instance']();
      }
      else if (nb < 30)//pour ancien navigateur avec chargement onload de DF_ObjetDefilant_Off(id)
      {
         setTimeout(function(){DF_ObjetNavigMous(id,etat,nb)},15);
      }
}



function DF_ObjetSensInverse (id)
{
   if(typeof this.DF_ObjetParam != 'undefined' && typeof this.DF_ObjetParam[id] != 'undefined' && this.DF_ObjetParam[id]['id_defile'] != null && typeof this.DF_ObjetParam[id]['Timer'] == 'number' && this.DF_ObjetParam[id]['inverse'] == 1 && !(this.DF_ObjetParam[id]['pscrnt']  == - this.DF_ObjetParam[id]['p_retour'] || this.DF_ObjetParam[id]['pscrnt'] == this.DF_ObjetParam[id]['psinit']))
      {
         this.DF_ObjetParam[id]['sens'] *= -1;
      }
}



function DF_ObjetDefilant_On (id)
{
   if(typeof this.DF_ObjetParam[id]['id_defile'] == 'undefined' && typeof this.DF_ObjetParam[id]['instance'] != 'undefined')
      {
         this.DF_ObjetParam[id]['instance']();   
      }
      else
      {
         DF_ObjetNavigMous(id,'out');
      }
}



function DF_ObjetDefilant_Off (id)
{
   DF_ObjetNavigMous(id,'over');
}



function DF_ObjetDefilant_On_Off (id)
{
   if(typeof this.DF_ObjetParam[id]['id_defile'] == 'undefined' || (typeof this.DF_ObjetParam[id]['Timer'] == 'number' && this.DF_ObjetParam[id]['Timer'] == 0))
      {
         DF_ObjetDefilant_On (id);
      }
      else
      {
         DF_ObjetNavigMous(id,'over');
      }
}



function DF_ObjetDefilant_On_Inverse (id)
{
   if(typeof this.DF_ObjetParam[id]['id_defile'] == 'undefined' || (typeof this.DF_ObjetParam[id]['Timer'] == 'number' && this.DF_ObjetParam[id]['Timer'] == 0))
      {
         DF_ObjetDefilant_On (id);
      }
      else
      {
         DF_ObjetSensInverse (id);
      }
}



function DF_ObjetDefilant_Inverse (id)
{
   if(typeof this.DF_ObjetParam[id]['Timer'] == 'number' && this.DF_ObjetParam[id]['Timer'] > 0)
      {
         DF_ObjetSensInverse (id);
      }
}



function addLoad_DF_ObjetDefilant(func)
{
   if (window.addEventListener)
      {
         window.addEventListener("load", func, false);
      }
   else if (document.addEventListener)
      {
         document.addEventListener("load", func, false);
      }
   else if (window.attachEvent)
      {
         window.attachEvent("onload", func);
      }
}