
const windows = self;
document = {};
var lottiejs = (function(window) {
    "use strict";
    /*<%= contents %>*/
    self.importScripts(
        "main.js",
        "utils/common.js",
        "utils/BaseEvent.js",
        "utils/helpers/arrays.js",
        //"utils/helpers/html_elements.js",
        "utils/helpers/dynamicProperties.js",
        "utils/helpers/blendModes.js",
        "3rd_party/transformation-matrix.js",
        "3rd_party/seedrandom.js",
        "3rd_party/BezierEaser.js",
        //"utils/animationFramePolyFill.js",
        "utils/functionExtensions.js",
        "utils/bez.js",
        "utils/DataManager.js",
        "utils/DataManagerWorkerOverrides.js" ,
        "utils/FontManager.js",
        "utils/FontManagerWorkerOverride.js" ,
        "utils/PropertyFactory.js",
        "utils/TransformProperty.js",
        "utils/shapes/ShapePath.js",
        "utils/shapes/ShapeProperty.js",
        "utils/shapes/ShapeModifiers.js",
        "utils/shapes/TrimModifier.js",
        "utils/shapes/RoundCornersModifier.js",
        "utils/shapes/RepeaterModifier.js",
        "utils/shapes/ShapeCollection.js",
        "utils/shapes/DashProperty.js",
        "utils/shapes/GradientProperty.js",
        "utils/shapes/shapePathBuilder.js",
        //"utils/imagePreloader.js" ,
        "utils/imagePreloaderWorkerOverride.js" ,
        "utils/featureSupport.js",
        "utils/filters.js",
        "utils/asset_loader.js",
        "utils/asset_loader_worker_override.js" ,
        "utils/text/TextAnimatorProperty.js",
        "utils/text/TextAnimatorDataProperty.js",
        "utils/text/LetterProps.js",
        "utils/text/TextProperty.js",
        "utils/text/TextSelectorProperty.js",
        "utils/pooling/pool_factory.js",
        "utils/pooling/pooling.js",
        "utils/pooling/point_pool.js",
        "utils/pooling/shape_pool.js",
        "utils/pooling/shapeCollection_pool.js",
        "utils/pooling/segments_length_pool.js",
        "utils/pooling/bezier_length_pool.js",
        "renderers/BaseRenderer.js",
        "renderers/SVGRenderer.js",
        "renderers/CanvasRenderer.js" ,
        "renderers/CanvasRendererWorkerOverride.js",
    
        "mask.js",
        "elements/helpers/HierarchyElement.js",
        "elements/helpers/FrameElement.js",
        "elements/helpers/TransformElement.js",
        "elements/helpers/RenderableElement.js",
        "elements/helpers/RenderableDOMElement.js",
        "elements/helpers/shapes/ProcessedElement.js",
    
        "elements/helpers/shapes/SVGShapeData.js" ,
        "elements/helpers/shapes/SVGTransformData.js",
        "elements/helpers/shapes/SVGStrokeStyleData.js" ,
        "elements/helpers/shapes/SVGFillStyleData.js",
        "elements/helpers/shapes/SVGGradientFillStyleData.js" ,
        "elements/helpers/shapes/SVGGradientStrokeStyleData.js" ,
        "elements/helpers/shapes/ShapeGroupData.js",
        "elements/helpers/shapes/SVGElementsRenderer.js",
        "elements/helpers/shapes/ShapeTransformManager.js",
        "elements/helpers/shapes/CVShapeData.js" ,
        "elements/BaseElement.js",
        "elements/NullElement.js",
        "elements/svgElements/SVGBaseElement.js",
        "elements/ShapeElement.js",
        "elements/TextElement.js",
        "elements/CompElement.js",
        "elements/ImageElement.js",
        "elements/SolidElement.js",
    
        "elements/svgElements/SVGShapeElement.js",
    
        "elements/canvasElements/CVContextData.js" ,
        "elements/canvasElements/CVBaseElement.js" ,
        "elements/canvasElements/CVImageElement.js" ,
        "elements/canvasElements/CVImageElementOverride.js" ,
        "elements/canvasElements/CVCompElement.js" ,
        "elements/canvasElements/CVMaskElement.js" ,
        "elements/canvasElements/CVShapeElement.js" ,
        "elements/canvasElements/CVSolidElement.js" ,
        //"elements/canvasElements/CVTextElement.js" data-builds="full,canvas,canvas_light",
        "elements/canvasElements/CVEffects.js" ,
        /*"elements/htmlElements/HBaseElement.js" data-builds="full,html,html_light",
        "elements/htmlElements/HSolidElement.js" data-builds="full,html,html_light",
        "elements/htmlElements/HCompElement.js" data-builds="full,html,html_light",
        "elements/htmlElements/HShapeElement.js" data-builds="full,html,html_light",
        "elements/htmlElements/HTextElement.js" data-builds="full,html,html_light",
        "elements/htmlElements/HImageElement.js" data-builds="full,html,html_light",
        "elements/htmlElements/HCameraElement.js" data-builds="full,html,html_light",
        "elements/htmlElements/HEffects.js" data-builds="full,html,html_light",*/
        "animation/AnimationManager.js",
        "animation/AnimationManagerWorkerOverride.js",
        "animation/AnimationItem.js",
        "animation/AnimationItemWorkerOverride.js" ,
        
        "utils/expressions/Expressions.js",
        "utils/expressions/ExpressionManager.js" ,
        "utils/expressions/expressionHelpers.js",
        "utils/expressions/ExpressionPropertyDecorator.js" ,
        "utils/expressions/ExpressionTextPropertyDecorator.js" ,
        "utils/expressions/ShapeInterface.js" ,
        "utils/expressions/TextInterface.js" ,
        "utils/expressions/LayerInterface.js" ,
        "utils/expressions/CompInterface.js" ,
        "utils/expressions/TransformInterface.js" ,
        "utils/expressions/ProjectInterface.js" ,
        "utils/expressions/EffectInterface.js" ,
        "utils/expressions/MaskInterface.js" ,
        "utils/expressions/ExpressionValueFactory.js" ,
        "utils/expressions/TextSelectorPropertyDecorator.js" ,
        "effects/SliderEffect.js" ,
        "effects/EffectsManagerPlaceholder.js" ,
        "EffectsManager.js" ,
                );
    var lottiejs = {};

    var _isFrozen = false;

    function loadAnimation(params) {
        return animationManager.loadAnimation(params);
    }

    function setQuality(value) {
        if (typeof value === 'string') {
            switch (value) {
                case 'high':
                    defaultCurveSegments = 200;
                    break;
                case 'medium':
                    defaultCurveSegments = 50;
                    break;
                case 'low':
                    defaultCurveSegments = 10;
                    break;
            }
        } else if (!isNaN(value) && value > 1) {
            defaultCurveSegments = value;
        }
        if (defaultCurveSegments >= 50) {
            roundValues(false);
        } else {
            roundValues(true);
        }
    }

    lottiejs.play = animationManager.play;
    lottiejs.pause = animationManager.pause;
    lottiejs.togglePause = animationManager.togglePause;
    lottiejs.setSpeed = animationManager.setSpeed;
    lottiejs.setDirection = animationManager.setDirection;
    lottiejs.stop = animationManager.stop;
    lottiejs.registerAnimation = animationManager.registerAnimation;
    lottiejs.loadAnimation = loadAnimation;
    lottiejs.resize = animationManager.resize;
    lottiejs.goToAndStop = animationManager.goToAndStop;
    lottiejs.destroy = animationManager.destroy;
    lottiejs.setQuality = setQuality;
    lottiejs.freeze = animationManager.freeze;
    lottiejs.unfreeze = animationManager.unfreeze;
    lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations;
    lottiejs.version = '[[BM_VERSION]]';

    var renderer = '';
    return lottiejs;
})({});

onmessage = function(evt) {
    let canvas = evt.data.canvas;
    let ctx = canvas.getContext("2d");
    let animation = lottiejs.loadAnimation({
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        animationData: evt.data.animData,
        rendererSettings: {
            context: ctx,
            scaleMode: 'noScale',
            clearCanvas: true
        }
    });

    const timePerFrame = 1000 / animation.frameRate;
    function render(animation, prev, time) {
        prev = prev ? prev : time;
        const delay = time - prev;
        let endReached = false;
        if (delay >= timePerFrame) {
            animation.renderFrame();
            animation.currentFrame += 1;
            if (animation.currentFrame >= animation.totalFrames) {
              animation.currentFrame =
                  animation.currentFrame % animation.totalFrames;
              endReached = true && !animation.loop;
            }
            prev = time;
        }
        if (!endReached)
          requestAnimationFrame(render.bind(null, animation, prev));
    }
    requestAnimationFrame(render.bind(null, animation, null));
};

