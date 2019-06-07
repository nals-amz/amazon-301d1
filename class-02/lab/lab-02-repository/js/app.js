'use strict';

function Photo(img) {
  this.image_url = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.description;
}

Photo.allPhotos = [];
Photo.keywords = [];
Photo.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let photoClone = $('div[class="clone"]');

  let photoHtml = $('#photo-template').html();

  photoClone.html(photoHtml);

  photoClone.find('h2').text(this.title);
  photoClone.find('img').attr('src', this.image_url);
  photoClone.find('p').text(this.description);
  photoClone.removeClass('clone');
  photoClone.attr('class', this.title);
};

Photo.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Photo.allPhotos.push(new Photo(item));
        Photo.keywords.push(item.keyword);
      });
    })
    .then(Photo.loadPhotos);
};

Photo.loadPhotos = (filterKeyword) => {
  Photo.allPhotos.forEach(photo => {
    if(filterKeyword === undefined || filterKeyword==='default' || filterKeyword===photo.keyword)
      photo.render()
  });
  // $('#filter-list').html('');
  console.log(Photo.keywords);
  Photo.keywords.forEach( keyword => {
    console.log('adding options');
    $('#filter-list').append(`<option>${keyword}</option>`);
  });
};

$(() => Photo.readJson());

$('#filter-list').on('change', function(){
  console.log($(this).val());
  $('main>div').remove();
  Photo.loadPhotos( $(this).val() );

});


