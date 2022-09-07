import Views from './views';
import icons from 'url:../../img/icons.svg';
class PaginationView extends Views {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    // Page 1 and others
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto = ${
          curPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    // last Page and others
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto = ${
          curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
    }
    // other Pages
    if (curPage < numPages) {
      return `
        <button data-goto = ${
          curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto = ${
          curPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    // Page  1 only
    return '';
  }
}

export default new PaginationView();
