window.handleNewMealRequest = (params) => {
      fetch(`/api/meals/${params.id}`)
          .then((res) => res.json())
          .then((data) => {
   document.body.innerHTML = `
<header>
	<div class="menu">
		<div class="logo">
			<a href="/" data-navigo>
				<h1>mealinfo
					<samp>:</samp>
				</h1>
			</a>
		</div>
		<div>
			<ul>	<a href="/" data-navigo>Home</a>
				<a href="meals" data-navigo>Meals</a>
			</ul>
		</div>
	</div>
</header>
<div class="container col-lg-6 " style="height:85vh">
	<form id="newMeal" class="align-self-center text-center border border-light p-5 " action="#!">
		<p class="h2 mb-4">Add a meal</p>
		<!-- Title -->
		<input type="text" name="title" id="defaultRegisterFormText" class="form-control mb-4 " placeholder="meal">
		<div class="form-row mb-4">
			<div class="col">
				<!-- Meal title -->
				<input type="text" name="location" id="defaultRegisterFormLocation" class="form-control" placeholder="Location">
			</div>
			<div class="col">
				<!-- Last name -->
				<input type="text" name="price" id="defaultRegisterFormPrice" class="form-control" placeholder="Price">
			</div>
		</div>
		<!-- Description -->
		<textarea class="form-control" name="description" rows="6" cols="30">Description..</textarea>
		<!-- Sign up button -->
		<button class="btn btn-info my-4 btn-block" type="submit">Add</button>
		<!-- Social register -->
		<p class="resSucces"></p>
		<p class="resError"></p>
	</form>
	<!-- Default form register -->
</div>
<footer id="footer" class="mb-0">
	<div class="footer-container ">
		<div class="social-icons">
			<ul>
				<li>
					<a href="https://www.facebook.com/ghofranebh90" class="social-icon">	<i class="fa fa-facebook"></i>
					</a>
				</li>
				<li>
					<a href="" class="social-icon">	<i class="fa fa-instagram"></i>
					</a>
				</li>
				<li>
					<a href="https://www.behance.net/Ghofranebh" class="social-icon">	<i class="fa fa-behance"></i>
					</a>
				</li>
				<li>
					<a href="https://www.linkedin.com/in/ghofranebenhmaid/" class="social-icon">	<i class="fa fa-linkedin"></i>
					</a>
				</li>
				<li>
					<a href="https://dribbble.com/Ghofrane" class="social-icon">	<i class="fa fa-dribbble"></i>
					</a>
				</li>
				<li>
					<a href="https://github.com/benhmaid" class="social-icon">	<i class="fa fa-github"></i>
					</a>
				</li>
			</ul>
		</div>
		<hr class="line" />
		<div>
			<h4>&copy; 2020 Ghofrane Ben Hmaid</h4>
		</div>
	</div>
</footer>
   `;
   const form = document.getElementById('newMeal');

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      let form = e.target;
      let titleInput = form.elements.title;
      let locationInput = form.elements.location;
      let priceInput = form.elements.price;
      let descriptionInput = form.elements.description;
      let insertData = {
         title: titleInput.value,
         location: locationInput.value,
         description: descriptionInput.value,
         price: priceInput.value
      };
      console.log(insertData);
      const message = document.querySelector('.resSucces');
      const message2 = document.querySelector('.resError');
      if (
         titleInput.value !== '' &&
         locationInput.value !== '' &&
         descriptionInput.value !== '' &&
         priceInput.value !== ''
      ) {
         fetch('/api/meals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(insertData)
         })
            .then((response) => {
               response.json();
            })
            .then((data) => {
               message.innerHTML = `Thank you . Your meal is now succesfully placed.  `;
            });
      } else if (
         titleInput.value == '' ||
         locationInput.value == '' ||
         descriptionInput.value == '' ||
         priceInput.value == ''
      ) {
         message2.innerHTML = `Please, fill correctly the form.`;
      }
   });

   router.updatePageLinks();
};
