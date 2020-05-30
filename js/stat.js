'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 30;
var HIST_HEIGHT = 150;
var BAR_HEIGHT = HIST_HEIGHT;
var BAR_WIDTH = 40;
var PADDING = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING * 3);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING * 5);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    var columnGap = CLOUD_X + GAP + (GAP * 2 + BAR_WIDTH) * i
    ctx.fillText(players[i], columnGap, CLOUD_HEIGHT - PADDING);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(249, 100%, ' + Math.floor(Math.random() * 101) + '%)';
    }
    var resultHeight = BAR_HEIGHT * times[i] / maxTime;
    ctx.fillRect(columnGap, GAP * 3 + HIST_HEIGHT - resultHeight, BAR_WIDTH, resultHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), columnGap, GAP * 2.8 + HIST_HEIGHT - resultHeight);
  }
};
