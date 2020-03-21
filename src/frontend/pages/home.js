window.handleHomeRequest = () => {
   document.body.innerHTML = `
   <header>
   <div class="menu">
      <div class="logo">
         <a href="meals" data-navigo>
            <h1>mealinfo
               <samp>:</samp>
            </h1>
         </a>
      </div>
      <div>
         <ul>
            <a href="/" data-navigo>Home</a>
            <a href="meals" data-navigo>Meals</a>
            <button type="button" class="btn btn-outline">See All Meals</button>
            </a>
         </ul>
      </div>
   </div>
</header>
<div class=" bg-info p-5 z-depth-1-half  section justify-content-center">
   <div>
      <h1 class="display-1 txt-looking-meal mb-4">
      Looking for a Meal
      </1>
   </div>
   <div>
      <a href="meals" data-navigo>
      <button type="button" class="btn btn-outline">See All Meals</button>
      </a>
   </div>
   <div>
      <form class="search-form">
         <input class="active-cyan-2" id="input_meal" type="text"  name="fname" placeholder="Search">
      </form>
   </div>
   <div class="meal-search"><button id="the-important-button">Submit</button>​</div>
</div>
<div class="slider_meal p-4">
   <div class="glider-contain multiple">
      <button class="glider-prev">
      <i class="fa fa-chevron-left"></i>
      </button>
      <div class="glider">
      </div>
      <button class="glider-next">
      <i class="fa fa-chevron-right"></i>
      </button>
      <div id="dots" class="glider-dots"></div>
   </div>
</div>
<div class="section_add_meal">
   <div class="container col-3 justify-content-center">
   <div class="text-center"> 
   <h1 class="display-4 mb-4">Hungry yet? </h1>
   <p>See something you like? Have an idea for an amazing meal of your own, or even something chill and casual?

</p> </div>
	  <div class="row justify-content-center ">
         <div class="px-2">
            <a href="/meals/new" class="shadow-sm px-4 p-2 btn btn-outline-info waves-effect" role="button" aria-pressed="true">Create a Meal</a>
         </div>
         <div class="px-2">
            <a  href="meals" data-navigo class="shadow-sm px-4 p-2 btn btn-outline-success waves-effect" role="button" aria-pressed="true">See All Meals</a>
         </div>
      </div>
   </div>
</div>

<div class="row mt-4 mx-auto col-8 justify-content-center"><h1> Reviews </h1></div>
<div class="d-flex slider_review">


</div>
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

   const mealSearch = document.querySelector('.meal-search');
   function loadMeals() {
      fetch('/api/meals')
         .then((res) => res.json())
         .then((data) => {
            const search = document.querySelector('.search-form');
            search.addEventListener('submit', (e) => {
               e.preventDefault();
               let input = input_meal.value;

               const filterMeals = data.filter((meal) => {
                  if (meal.title.toUpperCase().includes(input.toUpperCase())) {
                     console.log(meal.title);
                     //const div = document.createElement('div');
                     let searchList = '';

                     searchList += `
					 <div class="card" style="width: 20rem;">
                    	<div class="card-body">
                    		<img class="card-img-top" src="https://source.unsplash.com/400x260?${meal.title}" alt="${meal.title}" />
                    		<h5 class="card-title">${meal.title}</h5>
                    		<p class="card-text">${meal.description}</p>
                    		<a href="meal/${meal.id}" class="btn btn-primary">Read More</a>
                    	</div>
                    </div>
               
                    `;
                     if (mealSearch.style.display === 'none') {
                        mealSearch.style.display = 'block';
                     } else {
                        mealSearch.style.display = 'none';
                     }

                     mealSearch.innerHTML = searchList;
                     return searchList;
                  }
               });
            });

            data.forEach((element) => {
               const carouselItem = document.querySelector('.glider-track');
               const div = document.createElement('figure');
               div.innerHTML = `
                <div class="card" style="width: 20rem;">
             	<div class="card-body">
             	<img class="card-img-top" src="https://source.unsplash.com/400x260?${element.title}" alt="${element.title}" />
             	<h5 class="card-title">${element.title}</h5>
             	<p class="card-text">${element.description}</p>
             	<a href="meal/${element.id}" class="btn btn-primary">Read More</a>
             	</div>
                </div>
             `;
               carouselItem.appendChild(div);
            });
         });
   }

   function loadReviews() {
      fetch('/api/reviews')
         .then((res) => res.json())
         .then((data) => {
            console.log(data);

            const carouselReviews = document.querySelector('.slider_review');
            // const carouselReviews = document.querySelector('.slider_review');

            data.forEach((element) => {
               const div = document.createElement('div');
               div.innerHTML = `
                 
               
                <div class="reviewsCart px-3  m-2">

        <div class="row d-flex align-items-center">
          <div
            class="col-4 avatar w-100 white d-flex justify-content-center align-items-center"
          >
            <img
              src="https://source.unsplash.com/260x260?${element.stars}"
              class="img-fluid rounded-circle z-depth-1"
            />
          </div>
          <div class="col-8">
            <h6 class="font-weight-bold pt-2">${element.name}</h6>
            <p class="text-muted">
   
            </p>
            <p class="text-muted">
             ${element.description}</p>
          </div>

        </div>
      </div>
                `;
               carouselReviews.appendChild(div);
            });
         });
      // carouselReviews.innerHTML = '';
   }

   loadMeals();
   loadReviews();

   router.updatePageLinks();
};
