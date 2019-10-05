$(document).ready(function(){
     var mode = 1;
     var canvas = document.getElementById("canvas");
     canvasStyle = canvas.style;
     canvas.width = 0.90*window.innerWidth;
     canvas.height = 0.98*window.innerHeight;

     //Listeners
     $("#canvas").click(function(e){
          if (mode == 1){
              getPosition(e);  
          }
          else{
               console.log("arc mode");
               
          }
     });
     $("#addVertexBtn").click(function(e){
          vertexMode(e); 
     });
     $("#addArcBtn").click(function(e){
          arcMode(e); 
     });
     function vertexMode(event){
          mode = 1;
          canvasStyle.cursor="crosshair";
     }
     function arcMode(event){
          mode = 2;
          canvasStyle.cursor="copy";
     }
     //End of listeners

     var pointSize = 25;
     var vertexcoords = [];
     

     function getPosition(event){

          var rect = canvas.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;
          var curCoord = new coordinate(x,y);
          var validPlacement = true;
          

          if(vertexcoords.length>0){
               for(var i=0;i<vertexcoords.length;i++){
                    var curvertexsetcoord = vertexcoords[i];
                    var curVertexX = curvertexsetcoord.x;
                    var curVertexY = curvertexsetcoord.y;
                    if(curCoord.x <= curVertexX+55 && curCoord.x >= curVertexX-55 && curCoord.y <= curVertexY+55 && curCoord.y >= curVertexY-55){
                         validPlacement = false
                    }

          }
               if(validPlacement){
                    addcoord(x,y);
                    drawCoordinates(x,y);
               }
          }

          else{
               addcoord(x,y);
               drawCoordinates(x,y);
               
          }
          
          
     }

     function drawCoordinates(x,y){	
          var ctx = document.getElementById("canvas").getContext("2d");
          ctx.fillStyle = "#ff2626"; // Red color
          ctx.strokestyle = "black";
          ctx.beginPath();
          ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.stroke();
     
     }

     
     function addcoord(x,y){
          var c = new coordinate(x,y);
          vertexcoords.push(c)

     }
     function coordinate(x, y) {
          this.x = x;
          this.y = y;
      }
});