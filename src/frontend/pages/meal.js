
window.handleMealRequest = (params) => {
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
			<ul>
				<a href="/" data-navigo>Home</a>
				<a href="meals" data-navigo>Meals</a>
				
			</ul>
		</div>
	</div>
</header>
<div class='container'>
<div class=" col-sm-9" id="meal-info">
<div class="row">
<div class="col">
<h1> ${data[0].title}</h1>
</div>
		<div class="row">
				<div class="col">
					<img src="https://source.unsplash.com/450x300?${data[0].title}" alt="${data[0].title}" />
				</div>
				<div class="col meal-desciption">
					<p>
						<span></span>${data[0].description}
					</p>
					<p>
						<span>
							<i class="fa fa-map-marker"></i>
						</span> ${data[0].location}
					</p>
					<p>
						<span>
							Price: 
						</span> ${data[0].price} Kr
					</p>
				</div>
			</div>
		</div>
	</div>
	<form class="booking" id="reservationsForm" >
	<h1 class="pb-3 reservationTitle">Place an order for a ${data[0].title} meal </h1>
		<div class="form-row">
			<div class="col">
				<input type="text" class="form-control" name="name" value="" placeholder="Name">
				</div>
				<div class="col">
					<input type="email" class="form-control" name="email" value="" id="inputEmail3" placeholder="Email">
					</div>
					<div class="col">
						<input type="text" class="form-control" name="phone" value="" placeholder="Phone">
						</div>
						<button type="submit" class="btn btn-primary">CONFIRM</button>
					</div>
					<div class="resSucces reservationMessage"> </div>
					<div class="resError reservationMessage"> </div>
					
				</form>
			</div>
			<footer id="footer">
		<div class="footer-container">
			<div class="social-icons">
				<ul>
					<li>
						<a href="https://www.facebook.com/ghofranebh90" class="social-icon">
							<i class="fa fa-facebook"></i>
						</a>
					</li>
					<li>
						<a href="" class="social-icon">
							<i class="fa fa-instagram"></i>
						</a>
					</li>
					<li>
						<a href="https://www.behance.net/Ghofranebh" class="social-icon">
							<i class="fa fa-behance"></i>
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/ghofranebenhmaid/" class="social-icon">
							<i class="fa fa-linkedin"></i>
						</a>
					</li>
					<li>
						<a href="https://dribbble.com/Ghofrane" class="social-icon">
							<i class="fa fa-dribbble"></i>
						</a>
					</li>
					<li>
						<a href="https://github.com/benhmaid" class="social-icon">
							<i class="fa fa-github"></i>
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

         const form = document.querySelector('.booking');

         form.addEventListener('submit', (e) => {
            e.preventDefault();
            let form = e.target;
            let nameInput = form.elements.name;
            let emailInput = form.elements.email;
            let phoneInput = form.elements.phone;
            let insertData = {
               name: nameInput.value,
               email: emailInput.value,
               phone: phoneInput.value,
               meal_id: params.id
            };
            console.log(insertData);
            const message = document.querySelector('.resSucces');
            const message2 = document.querySelector('.resError');
            if (
               nameInput.value !== '' &&
               phoneInput.value !== '' &&
               emailInput.value !== ''
            ) {
               fetch('/api/reservations', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(insertData)
               })
                  .then((response) => {
                     response.json();
                  })
                  .then((data) => {
                     message.innerHTML = `Thank you ${nameInput.value}. Your ordered is now succesfully placed.  `;
                  });
            } else if (
               nameInput.value == '' ||
               phoneInput.value == '' ||
               emailInput.value == ''
            ) {
               message2.innerHTML = `Please, fill correctly the form.`;
            }
         });
      });

   router.updatePageLinks();
};
