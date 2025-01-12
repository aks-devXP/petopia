
const Footer = () => {
  return (
    <div className="mx-auto  mb-0 ">
      <footer className="bg-n-6 text-center text-white">
        {/* for now n-6
         */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-4">
            {/* Grid column */}
            <div className="text-center">
              <div
                className="rounded-full bg-white shadow-lg flex items-center justify-center mb-4 mx-auto"
                style={{ width: '150px', height: '150px' }}
              >
                <img
                  src="https://mdbootstrap.com/img/Photos/new-templates/animal-shelter/logo.png"
                  className="h-16"
                  alt=""
                  loading="lazy"
                />
              </div>

              <p>Homeless animal shelter The budgetary unit of the Capital City of Warsaw</p>

              <ul className="flex justify-center space-x-4 mt-4">
                <li>
                  <a className="text-white hover:text-gray-200" href="#!">
                    <i className="fab fa-facebook-square text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a className="text-white hover:text-gray-200" href="#!">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a className="text-white hover:text-gray-200" href="#!">
                    <i className="fab fa-youtube text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Grid column */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Animals</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>When your pet is missing
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Recently found
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>How to adopt?
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Pets for adoption
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Material gifts
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Help with walks
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Volunteer activities
                  </a>
                </li>
              </ul>
            </div>

            {/* Grid column */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Animals</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>General information
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>About the shelter
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Statistic data
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Job
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Tenders
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white hover:text-gray-200 flex items-center">
                    <i className="fas fa-paw mr-3"></i>Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Grid column */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Contact</h5>
              <ul className="space-y-2">
                <li>
                  <p className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-3"></i>Warsaw, 57 Street, Poland
                  </p>
                </li>
                <li>
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-3"></i>+ 01 234 567 89
                  </p>
                </li>
                <li>
                  <p className="flex items-center">
                    <i className="fas fa-envelope mr-3"></i>contact@example.com
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center p-3 bg-n-5">
          © 2020 Copyright:
          <a className="text-white hover:underline" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
