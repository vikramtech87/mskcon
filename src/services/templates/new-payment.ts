const newPaymentRequestXml = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
	<soap12:Header>
		<UserDetails xmlns="http://www.cmch-vellore.edu/">
			<userName>{{Username}}</userName>
			<password>{{Password}}</password>
			<program>{{Program}}</program>
		</UserDetails>
	</soap12:Header>
	<soap12:Body>
		<NEWCONFONLINEPAYSAVE xmlns="http://www.cmch-vellore.edu/">
			<conferencecode>{{ConferenceCode}}</conferencecode>
			<conferenceyear>2024</conferenceyear>
			<bankname>{{BankName}}</bankname>
			<remoteip></remoteip>
			<regno>{{RegisterNumber}}</regno>
			<candidatename>{{CandidateName}}</candidatename>
			<nameinreceipt>{{CandidateName}}</nameinreceipt>
			<address1></address1>
			<address2></address2>
			<city></city>
			<state></state>
			<country></country>
			<pincode></pincode>
			<phone></phone>
			<mobile></mobile>
			<email></email>
			<foodtype></foodtype>
			<participanttype></participanttype>
			<practicetype></practicetype>
			<accompanymembers></accompanymembers>
			<paymentamount>{{PaymentAmount}}</paymentamount>
			<ToWards>{{Towards}}</ToWards>
			<Allow80G>N</Allow80G>
			<PanCardNo></PanCardNo>
			<hasgst>N</hasgst>
			<GSTReg></GSTReg>
			<gstnumber></gstnumber>
			<gstmobileno></gstmobileno>
			<gstemailid></gstemailid>
			<inputcaption1></inputcaption1>
			<inputvalue1></inputvalue1>
			<inputcaption2></inputcaption2>
			<inputvalue2></inputvalue2>
			<inputcaption3></inputcaption3>
			<inputvalue3></inputvalue3>
			<inputcaption4></inputcaption4>
			<inputvalue4></inputvalue4>
			<inputcaption5></inputcaption5>
			<inputvalue5></inputvalue5>
		</NEWCONFONLINEPAYSAVE>
	</soap12:Body>
</soap12:Envelope>`;

export default newPaymentRequestXml;
