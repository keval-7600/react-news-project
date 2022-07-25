import React, { useEffect, useRef, useState } from 'react'
import NewsService from '../services/NewsService';
import NewsItem from './NewsItem';
import './News.css';
import GlobalConstants from '../common/GlobalConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";

const countries = [
  { "text": "Argentina", "value": "AR" },
  { "text": "Australia", "value": "AU" },
  { "text": "Austria", "value": "AT" },
  { "text": "Belgium", "value": "BE" },
  { "text": "Brazil", "value": "BR" },
  { "text": "Bulgaria", "value": "BG" },
  { "text": "Canada", "value": "CA" },
  { "text": "China", "value": "CN" },
  { "text": "Colombia", "value": "CO" },
  { "text": "Cuba", "value": "CU" },
  { "text": "Czech Republic", "value": "CZ" },
  { "text": "Egypt", "value": "EG" },
  { "text": "France", "value": "FR" },
  { "text": "Germany", "value": "DE" },
  { "text": "Greece", "value": "GR" },
  { "text": "Hong Kong", "value": "HK" },
  { "text": "Hungary", "value": "HU" },
  { "text": "India", "value": "IN" },
  { "text": "Indonesia", "value": "ID" },
  { "text": "Ireland", "value": "IE" },
  { "text": "Israel", "value": "IL" },
  { "text": "Italy", "value": "IT" },
  { "text": "Japan", "value": "JP" },
  { "text": "Korea, Republic of", "value": "KR" },
  { "text": "Latvia", "value": "LV" },
  { "text": "Lithuania", "value": "LT" },
  { "text": "Malaysia", "value": "MY" },
  { "text": "Mexico", "value": "MX" },
  { "text": "Morocco", "value": "MA" },
  { "text": "Netherlands", "value": "NL" },
  { "text": "New Zealand", "value": "NZ" },
  { "text": "Nigeria", "value": "NG" },
  { "text": "Norway", "value": "NO" },
  { "text": "Philippines", "value": "PH" },
  { "text": "Poland", "value": "PL" },
  { "text": "Portugal", "value": "PT" },
  { "text": "Romania", "value": "RO" },
  { "text": "Russian Federation", "value": "RU" },
  { "text": "Saudi Arabia", "value": "SA" },
  { "text": "Singapore", "value": "SG" },
  { "text": "Slovakia", "value": "SK" },
  { "text": "Slovenia", "value": "SI" },
  { "text": "South Africa", "value": "ZA" },
  { "text": "Sweden", "value": "SE" },
  { "text": "Switzerland", "value": "CH" },
  { "text": "Taiwan, Province of China", "value": "TW" },
  { "text": "Thailand", "value": "TH" },
  { "text": "Turkey", "value": "TR" },
  { "text": "Ukraine", "value": "UA" },
  { "text": "United Arab Emirates", "value": "AE" },
  { "text": "United Kingdom", "value": "GB" },
  { "text": "United States", "value": "US" },
  { "text": "Venezuela", "value": "VE" },
];


const categoryList = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];


function NewsList() {

  let query = useQuery();
  let navigator = useNavigate();
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('IN');
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState([{}]);
  const [pageNo, setPageNo] = useState(GlobalConstants.PAGINATION.PAGE_NO);
  const [collectionSize, setCollectionSize] = useState(null);
  const pageSize = GlobalConstants.PAGINATION.PAGE_SIZE;
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    if (query.get('page')) {
      setPageNo(parseInt(query.get('page')));
    } else {
      setPageNo(1);
      navigator('/news?page=' + 1);
    }
  }, [query.get('page')]);

  useEffect(() => {
    getNewsData();
  }, [onSearch, pageNo]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function getNewsData() {
    setIsLoading(true);
    NewsService.getNews(pageNo, pageSize, country, category).then(res => {
      setNewsList(res.data.articles);
      setCollectionSize(res.data.totalResults);
      setIsLoading(false);
    })
  }

  function onPageChange(pageNumber) {
    setPageNo(pageNumber);
    navigator('/news?page=' + pageNumber);
  }

  function onCountryChange(event) {
    setCountry(event.target.value);
  }

  function onCategoryChange(event) {
    setCategory(event.target.value);
  }

  function search() {
    if (category || country) {
      setOnSearch(prev=>!prev);
      navigator('/');
    }
  }

  return (
    <div className="container">
      <div className="card my-4" style={{ backgroundColor: '#383e57' }}>
        <div className="card-header text-primary">
          Search filter
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <select className="form-select" placeholder='Country'  onChange={onCountryChange}>
                <option disabled value='IN'>Select country...</option>
                {countries.map(item => <option key={item.text} value={item.value}>{item.text}</option>)}
              </select>
            </div>
            <div className="col-6">
              <select className="form-select" placeholder='Category' onChange={onCategoryChange}>
                <option disabled value=''>Select category...</option>
                {categoryList.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-sm btn-primary float-end mt-2" onClick={search}>Search</button>
        </div>
      </div>
      <h3 className="my-4 text-light">Top headlines</h3>
      {isLoading && <div className="d-flex justify-content-center">
        <div className="spinner-grow text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
      {!isLoading && newsList.length > 1 && <div className="row align-items-center">
        {newsList.map((record, index) => <div key={index} className="col-4 my-3 d-flex justify-content-center">
          <NewsItem key={index} item={record} />
        </div>)}
      </div>}
      {!isLoading && newsList.length > 1 && <div className='float-end'>
      <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={pageNo}
          itemsCountPerPage={pageSize}
          totalItemsCount={collectionSize}
          pageRangeDisplayed={5}
          onChange={onPageChange}
        />
    </div>}
    </div>
  )
}

export default NewsList;
