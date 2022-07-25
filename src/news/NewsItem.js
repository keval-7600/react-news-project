import React from 'react'
import GlobalConstants from '../common/GlobalConstants';
import './News.css';

function transformDesc(desc) {
    if (desc.split(' ').length > 20) {
        return desc.replace(/^(.{100}[^\s]*).*/, "$1") + '...';
    } else {
        return desc;
    }
}

function NewsItem({ item }) {
    return (
        <div className="card card2" style={{ width: "18rem" }}>
            <img src={item.urlToImage ? item.urlToImage : GlobalConstants.DEFAULT_PHOTO_URL} height="155" width="286" className="card-img-top" alt="..." />
            <span className="badge rounded-pill text-bg-danger position-absolute top-0 start-90 translate-middle">{item.source.name}</span>
            <div className="card-body">
                <h6 className="card-title"><a className="title-text" href={item.url} target="_blank" style={{ textDecoration: "none", color: "black" }}>{item.title}</a></h6>
                <p className="card-text">{item.description ? transformDesc(item.description) : 'No description available...'}</p>
                <div>
                    <small className="text-primary">
                        {item.publishedAt} {item.author ? ' by ' + item.author : ''}
                    </small>
                </div>
                <div className="float-start mt-1">
                    <a href={item.url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
