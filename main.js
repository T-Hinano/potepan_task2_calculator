$(document).ready(function ($) {
  let num_1;
  let num_2;
  let cal; //演算子格納
   
  num_1 = null;
  num_2 = null;
  cal = null;
  
  //数値と演算子の入力処理
  $(".cal-click").on('click',function(){
    if($(this).attr('data-role') == 'cal-number'){
      //数字入力処理
      if(cal == null){
        num_1 = input_number(num_1,$(this).val());
      }else{
        num_2 = input_number(num_2,$(this).val());
      }
    }else if($(this).attr('data-role') == 'cal-formula'){
      //演算子入力処理
      if(num_2 != null){
        //両項が揃っている場合は計算
        calculation();
        cal = null;
        num_2 = null;
        cal = $(this).val();
      }else{
        if(num_1 != "."){
          cal = $(this).val();
        }
     }
    }
    
    //ディスプレイ表示処理
    let strDisplay = "";
    if(num_1 != null){
      strDisplay = strDisplay + num_1;
    }
    if(cal != null){
      strDisplay = strDisplay + cal;
    }
    if(num_2 != null){
      strDisplay = strDisplay + num_2;
    }
    
    $(".display").text(String(strDisplay));
  });
   
  //数字データの入力処理
  function input_number(dispNum, inputNum){
    if(dispNum == null){
      dispNum = inputNum;
    }else if(dispNum == "."){
      dispNum = "0." + inputNum;
    }else{
      let res = false;
      res = dispNum.search(/[1-9]/);
      
      if(res !== -1){
        dispNum = dispNum + inputNum;
      }else{
        dispNum = inputNum;
      }
    }
    
    return dispNum;
  }
  
  //計算処理
  function calculation(){
    switch (cal){
      case "+":
        num_1 = Number(num_1) + Number(num_2);
        break;
      case "-":
        num_1 = Number(num_1) - Number(num_2);
        break;
      case "*":
        num_1 = Number(num_1) * Number(num_2);
        break;
      case "/":
        num_1 = Number(num_1) / Number(num_2);
        break;              
      default:
        break;
     }
  }
   
  //電卓をクリアして変数を初期化
  $(".clear-btn").on('click',function(){
    $(".display").text('');
    num_1 = null;
    num_2 = null;
    cal = null;
  });
   
  //calculation()で計算して結果を電卓に表示
  $(".cal-btn").on('click',function(){
    calculation();
    if(num_1 != null){
      $(".display").text('');
      $(".display").text(String(num_1));
    }
    num_1 = null;
    num_2 = null;
  }); 
});