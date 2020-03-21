window.handleMealsRequest = () => {
   document.body.innerHTML = `
   <header>
    <div class="menu">
        <div class="logo">
            <a href="/" data-navigo><h1>mealinfo<samp>:</samp></h1></a>
        </div>
        <div>
            <ul>
                <a href="/" data-navigo>Home</a>
                <a href="meals" data-navigo>Meals</a>
                
            </ul>
        </div>
    </div>
</header>
<div class="container col-lg-8">
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
   function loadContacts() {
      fetch('/api/meals')
         .then((res) => res.json())
         .then((data) => {
            data.forEach((element) => {
               const div = document.createElement('div');
               div.innerHTML = `<div class="card" style="width: 20rem;">
               <div class="card-body">
               
               <img class="card-img-top"
                            src="https://source.unsplash.com/400x250?${element.title}"
                            alt="${element.title}" />
                 <h5 class="card-title">${element.title}</h5>
                   <p class="card-text">${element.description}</p>
                   <a href="meal/${element.id}" class="btn btn-light-blue">Read more</a>
               </div>
               </div>
               
               `;
               container.appendChild(div);
            });
         });
   }

   loadContacts();
   container.innerHTML = '';

   router.updatePageLinks();
};
