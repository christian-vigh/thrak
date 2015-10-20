/*==============================================================================================================

    Locale for fr, fr-FR.

  ==============================================================================================================*/

  ( function ( $ )
   {
	var	this_locale = 
	   {
		datepicker	:
		   {
			altFormat		:  "dd/mm/yy",
			dateFormat		:  "dd/mm/yy",
			buttonText		:  "Sélectionner",
			closeText		:  "Fermer",
			currentText		:  "Aujourd'hui",
			dayNames		:  [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],
			dayNamesMin		:  [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ],
			dayNamesShort		:  [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ],
			monthNames		:  [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre" ],
			monthNamesShort		:  [ "Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec" ],
			nextText		:  "Mois suivant",
			prevText		:  "Mois précédent",
			showMonthAfterYear	:  true,
			weekHeader		:  "S",
			yearSuffix		:  ""
		    },
		datetimepicker	:
		   {
			altFormat		:  "dd/mm/yy",
			dateFormat		:  "dd/mm/yy",
			buttonText		:  "Sélectionner",
			closeText		:  "Fermer",
			currentText		:  "Aujourd'hui",
			dayNames		:  [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],
			dayNamesMin		:  [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ],
			dayNamesShort		:  [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ],
			monthNames		:  [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre" ],
			monthNamesShort		:  [ "Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec" ],
			nextText		:  "Mois suivant",
			prevText		:  "Mois précédent",
			showMonthAfterYear	:  true,
			weekHeader		:  "S",
			yearSuffix		:  ""
		    },
		timepicker :
		   {
			closeText		:  "Fermer",
			amNames			:  [ 'AM', 'A' ],
			currentText		:  "Maintenant",
			closeText		:  "Fermer",
			timeFormat		:  "hh:mm",
			pmNames			:  [ 'PM', 'P' ],
			timeOnlyTitle		:  "Choisissez l'heure",
			timeText		:  "Heure",
			hourText		:  "Heure",
			minuteText		:  "Minute",
			secondText		:  "Seconde",
			millisecText		:  "Milliseconde",
			microsecText		:  "Microseconde",
			timezoneText		:  "Timezone"
		     },
		masks	:
		   {
			"phone-number"		:  "99 99 99 99 99",
			"zipcode"		:  "999999",
			"date"			:  "99/99/9999"
		    },
		msgbox	:
		   {
			alert			:  
			   {
				title		:  "Message"
			    },
			error			:  
			   {
				title		:  "Erreur"
			    },
			confirm			:  
			   {
				title		:  "Confirmation"
			    }
		    }
	    } ;

	// Set locale options
	$. locale ( 'fr'   , this_locale ) ;
	$. locale ( 'fr-FR', this_locale ) ;
    } ( jQuery ) ) ;