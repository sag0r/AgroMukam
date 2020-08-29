$(document).ready(function () {
  $('#tree').kendoTreeView({
    select: function (e) {
      var el = e.node;
      var parentCategoryId = $(el).data('parentCategoryId');
      if (parentCategoryId == 0) {
        e.preventDefault();
      } else {
        var categoryId = $(el).data('categoryId');
        $('.category-tree').hide('slow');
        setSelectedCategoryName(categoryId);
      }
    }
  });

  var selectedCategoryIds = JSON.parse(`@Json.Serialize(Model.SelectedCategoryIds)`);
  if (selectedCategoryIds.length > 0) {
    setSelectedCategoryName(selectedCategoryIds[0]);
  }

  function setSelectedCategoryName(id) {

    if ($('#SelectedCategoryIds').length == 0) {
      $('.category-tree-select').append(`<input id="SelectedCategoryIds" name="SelectedCategoryIds" type="hidden">`);
    }

    $('#SelectedCategoryIds').val(id);
    var availableCategories = JSON.parse(`@Json.Serialize(Model.AvailableCategories)`);
    var selectedCategory = availableCategories.find(x => x.Value == id);
    if (selectedCategory) {
      $('.show-category-tree .c-hint').text(selectedCategory.Text);
    }
  }

  $('.show-category-tree').click(function () {
    $('.category-tree').toggle('slow');
  });

  $(document).click(function (e) {

    var { classList } = e.target;
    if (classList.contains('show-category-tree')) {
      return;
    }

    var el = document.querySelector('.category-tree');
    var x = el && el.contains(e.target);
    if (!x) {
      $('.category-tree').hide('slow');
    }
  });

});