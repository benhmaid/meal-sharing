window.handleHomeRequest = () => {
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
				<button type="button" class="btn btn-outline">Get Meal</button>
			</a>
		</ul>
	</div>
</div>
</header>
<div class="section">
<div>
	<h1 class="txt-looking-meal"> Looking for a Meal
	</1>
</div>
<div>
	<a href="meals" data-navigo>
		<button type="button" class="btn btn-outline">Get Meal</button>
	</a>
</div>
<div>
	<form class="search-form">
		<input class="active-cyan-2" id="input_meal" type="text"  name="fname" placeholder="Search">
		</form>
	</div>
	<div class="meal-search"><button id="the-important-button">Submit</button>​</div>
</div>
<div class= 'container'>
	
	<div class="meal-container"></div>
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

   const container = document.querySelector('.meal-container');
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
					 <div class="card" style="width: 18rem;">
                    	<div class="card-body">
                    		<img class="card-img-top" src="https://source.unsplash.com/400x260?${meal.title}" alt="${meal.title}" />
                    		<h5 class="card-title">${meal.title}</h5>
                    		<p class="card-text">${meal.description}</p>
                    		<a href="meal/${meal.id}" class="btn btn-primary">Read More</a>
                    	</div>
                    </div> `;
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
               const div = document.createElement('div');
               div.innerHTML = `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <img class="card-img-top" src="https://source.unsplash.com/400x260?${element.title}" alt="${element.title}" />
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.description}</p>
                            <a href="meal/${element.id}" class="btn btn-primary">Read More</a>
                        </div>
                    </div>`;
               container.appendChild(div);
            });
         });
   }

   loadMeals();
   container.innerHTML = '';

   router.updatePageLinks();
};
