<html>
<head>
	<link rel="stylesheet" type="text/css" href="myStyleSheet.css">
</head>
<body>

<?php
    include "jotform-api-php/JotForm.php";
    // if apiKey is entered, it means that it is not empty.
	if(isset($_POST['apikey']) ){
		$jotformAPI = new JotForm($_POST['apikey']);
		try{
			// if there is a valid apiKey, then get user information and forms.
			$user = $jotformAPI->getUser();
			$forms = $jotformAPI->getForms();
		}catch(Exception $e){
			// Redirect browser to login page if entered apiKey is not valid.
			header("Location: login.php");
			exit();
		}
	}
	// show user's information on top of the page.
	print '<div class="container">';
	print '<img src="'.$user["avatarUrl"].'" alt="John" style="width:90px">';
	print '<h1>'.$user["username"].'</h1>';  
	print '<p class="title">'.$user["email"].'</p>';
	print '</div>';
?>

<table>
	<thead>
		<tr>
			<th> Form Title </th>
			<th> Operations </th>
			<th> Total Submissions </th>
			<th> Creation Date </th>
			<th> Form ID </th>
		</tr>
	</thead>
	<tbody>
		<?php 
			foreach ($forms as $form) {
				print '<tr>';
				print '<td>'.$form["title"].'</td>';
				print '<td>';
				print '<a target="_blank" href='.$form["url"].'>View Form</a> ';
				// when click "Generate ChatForm", open modal and give ChatForm embed code.
				print '<a onclick="generate('.$form["id"].')">Generate ChatForm</a>';
				print '</td>';				
				print '<td>'.$form["count"].'</td>';
				print '<td>'.$form["created_at"].'</td>';
				print '<td>'.$form["id"].'</td>';
				print '</tr>';
			}
		?>
	</tbody>
</table>
 
<!-- The Modal -->
<div id="myModal" class="modal">
	<!-- Modal content -->
	<div class="modal-content">
		<div class="modal-header">
			<span class="close">&times;</span>
			<h2>Please copy the following link to the page wherever you want.</h2>
		</div>
		<div class="modal-body">
			<!-- chat form link will come here -->
		</div>
	</div>
</div

<!-- onclick actions --> 
<script type="text/javascript" src="myScript.js"></script>

</body>
</html>