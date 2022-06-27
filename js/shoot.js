AFRAME.registerComponent("shoot-balls",{

    init:function(){
        this.shootBalls()
    },

    shootBalls:function(){
        window.addEventListener("keydown",e=>{
            if(e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1
                })
                ball.setAttribute("material","color","black")
                
                var cam=document.querySelector("#camera")
                pos=cam.getAttribute("position")
                ball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })

                var camera=document.querySelector("#camera").object3D
                var direction= new THREE.Vector3()

                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",
                    direction.multiplyScalar(-20)
                )

                var scene=document.querySelector("#scene")
                ball.setAttribute("dynamic-body",
                {
                    shape:"sphere",
                    mass:"0"
                })
                ball.addEventListener("collide",this.paintBalls)
                scene.appendChild(ball)

                this.shootSound()
            }
        })
    },

    paintBalls:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)

        var scene=document.querySelector("#scene")

        var element=e.detail.target.el
        var elementHit=e.detail.body.el

        var paint=document.createElement("a-entity")

        var pos=element.getAttribute("position")
        var rotate=elementHit.getAttribute("rotation")

        paint.setAttribute("position",{
            x:pos.x,
            y:pos.y,
            z:pos.z
        })
        paint.setAttribute("rotation", {
            x: rotate.x,
            y: rotate.y,
            z: rotate.z,
          });

        paint.setAttribute("scale", {
            x: 2,
            y: 2,
            z: 2,
          });
        
        paint.setAttribute("geometry", {
            primitive: "plane",
            width: 0.5,
            height: 0.5
        });

        var color=Math.floor(Math.random()*10+1)

        paint.setAttribute("material",{
            opacity:1,
            transparent:true,
            src:"./images/paint splash-"+color+".png"
        })
        scene.appendChild(paint)
    
        element.removeEventListener("collide",this.paintBalls)
        scene.removeChild(element)
    },

    shootSound:function(){
        var entity=document.querySelector("#sound1")
        entity.components.sound.playSound()
    }
})