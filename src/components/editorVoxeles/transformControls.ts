import {
  BoxGeometry,
  BufferGeometry,
  Camera,
  CylinderGeometry,
  DoubleSide,
  Euler,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OctahedronGeometry,
  PlaneGeometry,
  Quaternion,
  Raycaster,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";

const _raycaster = new Raycaster();

const _tempVector = new Vector3();
const _tempVector2 = new Vector3();
const _tempQuaternion = new Quaternion();
const _unit = {
  X: new Vector3(1, 0, 0),
  Y: new Vector3(0, 1, 0),
  Z: new Vector3(0, 0, 1),
};

const _changeEvent = { type: "change" };
const _mouseDownEvent = { type: "mouseDown", mode: null as string | null };
const _mouseUpEvent = { type: "mouseUp", mode: null as string | null };
const _objectChangeEvent = { type: "objectChange" };

export class TransformControls extends Object3D {
  public readonly isTransformControls = true;
  public visible: boolean = true;
  public domElement: HTMLElement;
  public camera: Camera;
  public object: Object3D | undefined;
  public enabled: boolean = true;
  public axis: string | null = null;
  public mode: "translate" | "rotate" | "scale" = "translate";
  public translationSnap: number | null = null;
  public rotationSnap: number | null = null;
  public scaleSnap: number | null = null;
  public space: "world" | "local" = "world";
  public size: number = 1;
  public dragging: boolean = false;
  public showX: boolean = true;
  public showY: boolean = true;
  public showZ: boolean = true;

  // Limits
  public minX: number = -Infinity;
  public maxX: number = Infinity;
  public minY: number = -Infinity;
  public maxY: number = Infinity;
  public minZ: number = -Infinity;
  public maxZ: number = Infinity;

  // Internal
  private _gizmo: TransformControlsGizmo;
  private _plane: TransformControlsPlane;
  // @ts-ignore
  private _root: TransformControlsRoot;

  // Shared temporary variables accessible by children via 'controls.worldPosition' etc
  public worldPosition = new Vector3();
  public worldPositionStart = new Vector3();
  public worldQuaternion = new Quaternion();
  public worldQuaternionStart = new Quaternion();
  public cameraPosition = new Vector3();
  public cameraQuaternion = new Quaternion();
  public pointStart = new Vector3();
  public pointEnd = new Vector3();
  public rotationAxis = new Vector3();
  public rotationAngle = 0;
  public eye = new Vector3();

  public _offset = new Vector3();
  public _startNorm = new Vector3();
  public _endNorm = new Vector3();
  public _cameraScale = new Vector3();

  public _parentPosition = new Vector3();
  public _parentQuaternion = new Quaternion();
  public _parentQuaternionInv = new Quaternion();
  public _parentScale = new Vector3();

  public _worldScaleStart = new Vector3();
  public _worldQuaternionInv = new Quaternion();
  public _worldScale = new Vector3();

  public _positionStart = new Vector3();
  public _quaternionStart = new Quaternion();
  public _scaleStart = new Vector3();

  private _getPointer: (event: MouseEvent) => {
    x: number;
    y: number;
    button: number;
  };
  private _onPointerDown: (event: MouseEvent) => void;
  private _onPointerHover: (event: MouseEvent) => void;
  private _onPointerMove: (event: MouseEvent) => void;
  private _onPointerUp: (event: MouseEvent) => void;

  constructor(camera: Camera, domElement: HTMLElement) {
    super();

    this.domElement = domElement;
    this.camera = camera;

    // Bind events
    this._getPointer = getPointer.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerHover = onPointerHover.bind(this);
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerUp = onPointerUp.bind(this);

    // Create hierarchy
    this._root = new TransformControlsRoot(this);
    this._gizmo = new TransformControlsGizmo(this);
    this._root.add(this._gizmo);
    this._plane = new TransformControlsPlane(this);
    this._root.add(this._plane);
    this.add(this._root);

    if (domElement !== null) {
      this.connect();
    }
  }

  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointermove", this._onPointerHover);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
    this.domElement.style.touchAction = "none";
  }

  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.domElement.style.touchAction = "auto";
  }

  getHelper() {
    return this._root;
  }

  pointerHover(pointer: { x: number; y: number; button: number } | null) {
    if (this.object === undefined || this.dragging === true) return;
    if (pointer !== null) _raycaster.setFromCamera(pointer, this.camera);
    const intersect = intersectObjectWithRay(
      this._gizmo.picker[this.mode],
      _raycaster
    );
    if (intersect) {
      this.axis = intersect.object.name;
    } else {
      this.axis = null;
    }
  }

  pointerDown(pointer: { x: number; y: number; button: number } | null) {
    if (
      this.object === undefined ||
      this.dragging === true ||
      (pointer != null && pointer.button !== 0)
    )
      return;

    if (this.axis !== null) {
      if (pointer !== null) _raycaster.setFromCamera(pointer, this.camera);
      const planeIntersect = intersectObjectWithRay(
        this._plane,
        _raycaster,
        true
      );

      if (planeIntersect) {
        this.object.updateMatrixWorld();
        if (this.object.parent) this.object.parent.updateMatrixWorld();
        this._positionStart.copy(this.object.position);
        this._quaternionStart.copy(this.object.quaternion);
        this._scaleStart.copy(this.object.scale);
        this.object.matrixWorld.decompose(
          this.worldPositionStart,
          this.worldQuaternionStart,
          this._worldScaleStart
        );
        this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
      }

      this.dragging = true;
      _mouseDownEvent.mode = this.mode;
      this.dispatchEvent(_mouseDownEvent);
    }
  }

  pointerMove(pointer: { x: number; y: number; button: number } | null) {
    const axis = this.axis;
    const mode = this.mode;
    const object = this.object;
    let space = this.space;

    if (mode === "scale") {
      space = "local";
    } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
      space = "world";
    }

    if (
      object === undefined ||
      axis === null ||
      this.dragging === false ||
      (pointer !== null && pointer.button !== -1)
    )
      return;

    if (pointer !== null) _raycaster.setFromCamera(pointer, this.camera);
    const planeIntersect = intersectObjectWithRay(
      this._plane,
      _raycaster,
      true
    );
    if (!planeIntersect) return;

    this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);

    if (mode === "translate") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);
      if (space === "local" && axis !== "XYZ") {
        this._offset.applyQuaternion(this._worldQuaternionInv);
      }
      if (axis.indexOf("X") === -1) this._offset.x = 0;
      if (axis.indexOf("Y") === -1) this._offset.y = 0;
      if (axis.indexOf("Z") === -1) this._offset.z = 0;
      if (space === "local" && axis !== "XYZ") {
        this._offset
          .applyQuaternion(this._quaternionStart)
          .divide(this._parentScale);
      } else {
        this._offset
          .applyQuaternion(this._parentQuaternionInv)
          .divide(this._parentScale);
      }
      object.position.copy(this._offset).add(this._positionStart);

      if (this.translationSnap) {
        if (space === "local") {
          object.position.applyQuaternion(
            _tempQuaternion.copy(this._quaternionStart).invert()
          );
          if (axis.search("X") !== -1)
            object.position.x =
              Math.round(object.position.x / this.translationSnap) *
              this.translationSnap;
          if (axis.search("Y") !== -1)
            object.position.y =
              Math.round(object.position.y / this.translationSnap) *
              this.translationSnap;
          if (axis.search("Z") !== -1)
            object.position.z =
              Math.round(object.position.z / this.translationSnap) *
              this.translationSnap;
          object.position.applyQuaternion(this._quaternionStart);
        }
        if (space === "world") {
          if (object.parent)
            object.position.add(
              _tempVector.setFromMatrixPosition(object.parent.matrixWorld)
            );
          if (axis.search("X") !== -1)
            object.position.x =
              Math.round(object.position.x / this.translationSnap) *
              this.translationSnap;
          if (axis.search("Y") !== -1)
            object.position.y =
              Math.round(object.position.y / this.translationSnap) *
              this.translationSnap;
          if (axis.search("Z") !== -1)
            object.position.z =
              Math.round(object.position.z / this.translationSnap) *
              this.translationSnap;
          if (object.parent)
            object.position.sub(
              _tempVector.setFromMatrixPosition(object.parent.matrixWorld)
            );
        }
      }
      object.position.x = Math.max(
        this.minX,
        Math.min(this.maxX, object.position.x)
      );
      object.position.y = Math.max(
        this.minY,
        Math.min(this.maxY, object.position.y)
      );
      object.position.z = Math.max(
        this.minZ,
        Math.min(this.maxZ, object.position.z)
      );
    } else if (mode === "scale") {
      if (axis.search("XYZ") !== -1) {
        let d = this.pointEnd.length() / this.pointStart.length();
        if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;
        _tempVector2.set(d, d, d);
      } else {
        _tempVector.copy(this.pointStart);
        _tempVector2.copy(this.pointEnd);
        _tempVector.applyQuaternion(this._worldQuaternionInv);
        _tempVector2.applyQuaternion(this._worldQuaternionInv);
        _tempVector2.divide(_tempVector);
        if (axis.search("X") === -1) _tempVector2.x = 1;
        if (axis.search("Y") === -1) _tempVector2.y = 1;
        if (axis.search("Z") === -1) _tempVector2.z = 1;
      }
      object.scale.copy(this._scaleStart).multiply(_tempVector2);
      if (this.scaleSnap) {
        if (axis.search("X") !== -1)
          object.scale.x =
            Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap ||
            this.scaleSnap;
        if (axis.search("Y") !== -1)
          object.scale.y =
            Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap ||
            this.scaleSnap;
        if (axis.search("Z") !== -1)
          object.scale.z =
            Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap ||
            this.scaleSnap;
      }
    } else if (mode === "rotate") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);
      const ROTATION_SPEED =
        20 /
        this.worldPosition.distanceTo(
          _tempVector.setFromMatrixPosition(this.camera.matrixWorld)
        );
      let _inPlaneRotation = false;

      if (axis === "XYZE") {
        this.rotationAxis.copy(this._offset).cross(this.eye).normalize();
        this.rotationAngle =
          this._offset.dot(
            _tempVector.copy(this.rotationAxis).cross(this.eye)
          ) * ROTATION_SPEED;
      } else if (axis === "X" || axis === "Y" || axis === "Z") {
        this.rotationAxis.copy(_unit[axis as keyof typeof _unit]);
        _tempVector.copy(_unit[axis as keyof typeof _unit]);
        if (space === "local") {
          _tempVector.applyQuaternion(this.worldQuaternion);
        }
        _tempVector.cross(this.eye);
        if (_tempVector.length() === 0) {
          _inPlaneRotation = true;
        } else {
          this.rotationAngle =
            this._offset.dot(_tempVector.normalize()) * ROTATION_SPEED;
        }
      }

      if (axis === "E" || _inPlaneRotation) {
        this.rotationAxis.copy(this.eye);
        this.rotationAngle = this.pointEnd.angleTo(this.pointStart);
        this._startNorm.copy(this.pointStart).normalize();
        this._endNorm.copy(this.pointEnd).normalize();
        this.rotationAngle *=
          this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1;
      }

      if (this.rotationSnap)
        this.rotationAngle =
          Math.round(this.rotationAngle / this.rotationSnap) *
          this.rotationSnap;

      if (space === "local" && axis !== "E" && axis !== "XYZE") {
        object.quaternion.copy(this._quaternionStart);
        object.quaternion
          .multiply(
            _tempQuaternion.setFromAxisAngle(
              this.rotationAxis,
              this.rotationAngle
            )
          )
          .normalize();
      } else {
        this.rotationAxis.applyQuaternion(this._parentQuaternionInv);
        object.quaternion.copy(
          _tempQuaternion.setFromAxisAngle(
            this.rotationAxis,
            this.rotationAngle
          )
        );
        object.quaternion.multiply(this._quaternionStart).normalize();
      }
    }

    this.dispatchEvent(_changeEvent);
    this.dispatchEvent(_objectChangeEvent);
  }

  pointerUp(pointer: { x: number; y: number; button: number } | null) {
    if (pointer !== null && pointer.button !== 0) return;
    if (this.dragging && this.axis !== null) {
      _mouseUpEvent.mode = this.mode;
      this.dispatchEvent(_mouseUpEvent);
    }
    this.dragging = false;
    this.axis = null;
  }

  dispose() {
    this.disconnect();
    this._root.dispose();
  }

  attach(object: Object3D) {
    this.object = object;
    this.visible = true;
    this._root.visible = true;
    return this;
  }

  detach() {
    this.object = undefined;
    this.axis = null;
    this.visible = false;
    this._root.visible = false;
    return this;
  }

  reset() {
    if (!this.enabled) return;
    if (this.dragging && this.object) {
      this.object.position.copy(this._positionStart);
      this.object.quaternion.copy(this._quaternionStart);
      this.object.scale.copy(this._scaleStart);
      this.dispatchEvent(_changeEvent);
      this.dispatchEvent(_objectChangeEvent);
      this.pointStart.copy(this.pointEnd);
    }
  }

  setMode(mode: "translate" | "rotate" | "scale") {
    this.mode = mode;
    this.dispatchEvent(_changeEvent);
  }
  setTranslationSnap(translationSnap: number | null) {
    this.translationSnap = translationSnap;
  }
  setRotationSnap(rotationSnap: number | null) {
    this.rotationSnap = rotationSnap;
  }
  setScaleSnap(scaleSnap: number | null) {
    this.scaleSnap = scaleSnap;
  }
  setSize(size: number) {
    this.size = size;
    this.dispatchEvent(_changeEvent);
  }
  setSpace(space: "world" | "local") {
    this.space = space;
    this.dispatchEvent(_changeEvent);
  }
}

function getPointer(this: TransformControls, event: MouseEvent) {
  if (this.domElement && this.domElement.ownerDocument.pointerLockElement) {
    return { x: 0, y: 0, button: event.button };
  } else if (this.domElement) {
    const rect = this.domElement.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      button: event.button,
    };
  }
  return { x: 0, y: 0, button: event.button };
}

function onPointerHover(this: TransformControls, event: MouseEvent) {
  if (!this.enabled) return;
  // @ts-ignore
  switch (event.pointerType) {
    case "mouse":
    case "pen":
      this.pointerHover(this._getPointer(event));
      break;
  }
}

function onPointerDown(this: TransformControls, event: MouseEvent) {
  if (!this.enabled || !this.domElement) return;
  if (!document.pointerLockElement) {
    this.domElement.setPointerCapture(event.pointerId);
  }
  this.domElement.addEventListener("pointermove", this._onPointerMove);
  this.pointerHover(this._getPointer(event));
  this.pointerDown(this._getPointer(event));
}

function onPointerMove(this: TransformControls, event: MouseEvent) {
  if (!this.enabled) return;
  this.pointerMove(this._getPointer(event));
}

function onPointerUp(this: TransformControls, event: MouseEvent) {
  if (!this.enabled || !this.domElement) return;
  this.domElement.releasePointerCapture(event.pointerId);
  this.domElement.removeEventListener("pointermove", this._onPointerMove);
  this.pointerUp(this._getPointer(event));
}

function intersectObjectWithRay(
  object: Object3D,
  raycaster: Raycaster,
  includeInvisible?: boolean
) {
  const allIntersections = raycaster.intersectObject(object, true);
  for (let i = 0; i < allIntersections.length; i++) {
    if (allIntersections[i].object.visible || includeInvisible) {
      return allIntersections[i];
    }
  }
  return false;
}

const _tempEuler = new Euler();
const _alignVector = new Vector3(0, 1, 0);
const _zeroVector = new Vector3(0, 0, 0);
const _lookAtMatrix = new Matrix4();
const _tempQuaternion2 = new Quaternion();
const _identityQuaternion = new Quaternion();
const _dirVector = new Vector3();
const _tempMatrix = new Matrix4();
const _unitX = new Vector3(1, 0, 0);
const _unitY = new Vector3(0, 1, 0);
const _unitZ = new Vector3(0, 0, 1);
const _v1 = new Vector3();
const _v2 = new Vector3();
const _v3 = new Vector3();

class TransformControlsRoot extends Object3D {
  public controls: TransformControls;

  constructor(controls: TransformControls) {
    super();
    // @ts-ignore
    this.isTransformControlsRoot = true;
    this.controls = controls;
    this.visible = false;
  }

  updateMatrixWorld(force?: boolean) {
    const controls = this.controls;
    if (controls.object !== undefined) {
      controls.object.updateMatrixWorld();
      if (controls.object.parent === null) {
        console.error(
          "TransformControls: The attached 3D object must be a part of the scene graph."
        );
      } else {
        // @ts-ignore
        controls.object.parent.matrixWorld.decompose(
          controls._parentPosition,
          controls._parentQuaternion,
          controls._parentScale
        );
      }
      // @ts-ignore
      controls.object.matrixWorld.decompose(
        controls.worldPosition,
        controls.worldQuaternion,
        controls._worldScale
      );
      // @ts-ignore
      controls._parentQuaternionInv.copy(controls._parentQuaternion).invert();
      // @ts-ignore
      controls._worldQuaternionInv.copy(controls.worldQuaternion).invert();
    }
    controls.camera.updateMatrixWorld();
    // @ts-ignore
    controls.camera.matrixWorld.decompose(
      controls.cameraPosition,
      controls.cameraQuaternion,
      controls._cameraScale
    );
    // @ts-ignore
    if (controls.camera.isOrthographicCamera) {
      // @ts-ignore
      controls.camera.getWorldDirection(controls.eye).negate();
    } else {
      // @ts-ignore
      controls.eye
        .copy(controls.cameraPosition)
        .sub(controls.worldPosition)
        .normalize();
    }
    super.updateMatrixWorld(force);
  }

  dispose() {
    this.traverse(function (child) {
      // @ts-ignore
      if (child.geometry) child.geometry.dispose();
      // @ts-ignore
      if (child.material) child.material.dispose();
    });
  }
}

class TransformControlsGizmo extends Object3D {
  public controls: TransformControls;
  public materialLib: any;
  public gizmo: any = {};
  public picker: any = {};
  public helper: any = {};

  constructor(controls: TransformControls) {
    super();
    // @ts-ignore
    this.isTransformControlsGizmo = true;
    this.type = "TransformControlsGizmo";
    this.controls = controls;

    const gizmoMaterial = new MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      fog: false,
      toneMapped: false,
      transparent: true,
    });
    const gizmoLineMaterial = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      fog: false,
      toneMapped: false,
      transparent: true,
    });

    const matInvisible = gizmoMaterial.clone();
    matInvisible.opacity = 0;
    matInvisible.transparent = true;
    matInvisible.depthWrite = false;

    const matHelper = gizmoLineMaterial.clone();
    matHelper.opacity = 0.5;
    const matRed = gizmoMaterial.clone();
    matRed.color.setHex(0xff0000);
    const matGreen = gizmoMaterial.clone();
    matGreen.color.setHex(0x00ff00);
    const matBlue = gizmoMaterial.clone();
    matBlue.color.setHex(0x0000ff);
    const matRedTransparent = gizmoMaterial.clone();
    matRedTransparent.color.setHex(0xff0000);
    matRedTransparent.opacity = 0.5;
    const matGreenTransparent = gizmoMaterial.clone();
    matGreenTransparent.color.setHex(0x00ff00);
    matGreenTransparent.opacity = 0.5;
    const matBlueTransparent = gizmoMaterial.clone();
    matBlueTransparent.color.setHex(0x0000ff);
    matBlueTransparent.opacity = 0.5;
    const matWhiteTransparent = gizmoMaterial.clone();
    matWhiteTransparent.opacity = 0.25;
    const matYellowTransparent = gizmoMaterial.clone();
    matYellowTransparent.color.setHex(0xffff00);
    matYellowTransparent.opacity = 0.25;
    const matYellow = gizmoMaterial.clone();
    matYellow.color.setHex(0xffff00);
    const matGray = gizmoMaterial.clone();
    matGray.color.setHex(0x787878);

    this.materialLib = {
      xAxis: matRed,
      yAxis: matGreen,
      zAxis: matBlue,
      active: matYellow,
      xAxisTransparent: matRedTransparent,
      yAxisTransparent: matGreenTransparent,
      zAxisTransparent: matBlueTransparent,
      activeTransparent: matYellowTransparent,
    };

    const arrowGeometry = new CylinderGeometry(0, 0.04, 0.1, 12);
    arrowGeometry.translate(0, 0.05, 0);
    const scaleHandleGeometry = new BoxGeometry(0.08, 0.08, 0.08);
    scaleHandleGeometry.translate(0, 0.04, 0);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3)
    );
    const lineGeometry2 = new CylinderGeometry(0.0075, 0.0075, 0.5, 3);
    lineGeometry2.translate(0, 0.25, 0);

    function CircleGeometry(radius: number, arc: number) {
      const geometry = new TorusGeometry(
        radius,
        0.0075,
        3,
        64,
        arc * Math.PI * 2
      );
      geometry.rotateY(Math.PI / 2);
      geometry.rotateX(Math.PI / 2);
      return geometry;
    }

    function TranslateHelperGeometry() {
      const geometry = new BufferGeometry();
      geometry.setAttribute(
        "position",
        new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
      );
      return geometry;
    }

    const gizmoTranslate: any = {
      X: [
        [new Mesh(arrowGeometry, matRed), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new Mesh(arrowGeometry, matRed), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new Mesh(lineGeometry2, matRed), [0, 0, 0], [0, 0, -Math.PI / 2]],
      ],
      Y: [
        [new Mesh(arrowGeometry, matGreen), [0, 0.5, 0]],
        [new Mesh(arrowGeometry, matGreen), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new Mesh(lineGeometry2, matGreen)],
      ],
      Z: [
        [new Mesh(arrowGeometry, matBlue), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new Mesh(arrowGeometry, matBlue), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new Mesh(lineGeometry2, matBlue), null, [Math.PI / 2, 0, 0]],
      ],
      XYZ: [
        [
          new Mesh(new OctahedronGeometry(0.1, 0), matWhiteTransparent),
          [0, 0, 0],
        ],
      ],
      XY: [
        [
          new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matBlueTransparent),
          [0.15, 0.15, 0],
        ],
      ],
      YZ: [
        [
          new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matRedTransparent),
          [0, 0.15, 0.15],
          [0, Math.PI / 2, 0],
        ],
      ],
      XZ: [
        [
          new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matGreenTransparent),
          [0.15, 0, 0.15],
          [-Math.PI / 2, 0, 0],
        ],
      ],
    };

    const pickerTranslate: any = {
      X: [
        [
          new Mesh(new CylinderGeometry(0.4, 0, 0.6, 4), matInvisible),
          [0.3, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
        [
          new Mesh(new CylinderGeometry(0.4, 0, 0.6, 4), matInvisible),
          [-0.3, 0, 0],
          [0, 0, Math.PI / 2],
        ],
      ],
      Y: [
        [
          new Mesh(new CylinderGeometry(0.4, 0, 0.6, 4), matInvisible),
          [0, 0.3, 0],
        ],
        [
          new Mesh(new CylinderGeometry(0.4, 0, 0.6, 4), matInvisible),
          [0, -0.3, 0],
          [0, 0, Math.PI],
        ],
      ],
      Z: [
        [
          new Mesh(new CylinderGeometry(0.4, 0, 0.6, 4), matInvisible),
          [0, 0, 0.3],
          [Math.PI / 2, 0, 0],
        ],
        [
          new Mesh(new CylinderGeometry(0.4, 0, 0.6, 4), matInvisible),
          [0, 0, -0.3],
          [-Math.PI / 2, 0, 0],
        ],
      ],
      XYZ: [[new Mesh(new OctahedronGeometry(0.4, 0), matInvisible)]],
      XY: [
        [
          new Mesh(new BoxGeometry(0.4, 0.4, 0.01), matInvisible),
          [0.15, 0.15, 0],
        ],
      ],
      YZ: [
        [
          new Mesh(new BoxGeometry(0.4, 0.4, 0.01), matInvisible),
          [0, 0.15, 0.15],
          [0, Math.PI / 2, 0],
        ],
      ],
      XZ: [
        [
          new Mesh(new BoxGeometry(0.4, 0.4, 0.01), matInvisible),
          [0.15, 0, 0.15],
          [-Math.PI / 2, 0, 0],
        ],
      ],
    };

    const helperTranslate: any = {
      START: [
        [
          new Mesh(new OctahedronGeometry(0.01, 2), matHelper),
          null,
          null,
          null,
          "helper",
        ],
      ],
      END: [
        [
          new Mesh(new OctahedronGeometry(0.01, 2), matHelper),
          null,
          null,
          null,
          "helper",
        ],
      ],
      DELTA: [
        [
          new Line(TranslateHelperGeometry(), matHelper),
          null,
          null,
          null,
          "helper",
        ],
      ],
      X: [
        [
          new Line(lineGeometry, matHelper),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Y: [
        [
          new Line(lineGeometry, matHelper),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Z: [
        [
          new Line(lineGeometry, matHelper),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };

    const gizmoRotate: any = {
      X: [[new Mesh(CircleGeometry(0.5, 0.5), matRed)]],
      Y: [
        [
          new Mesh(CircleGeometry(0.5, 0.5), matGreen),
          null,
          [0, 0, -Math.PI / 2],
        ],
      ],
      Z: [
        [
          new Mesh(CircleGeometry(0.5, 0.5), matBlue),
          null,
          [0, Math.PI / 2, 0],
        ],
      ],
    };

    const helperRotate: any = {
      AXIS: [
        [
          new Line(lineGeometry, matHelper),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };

    const pickerRotate: any = {
      XYZE: [[new Mesh(new SphereGeometry(0.25, 10, 8), matInvisible)]],
      X: [
        [
          new Mesh(new TorusGeometry(0.5, 0.25, 4, 24), matInvisible),
          [0, 0, 0],
          [0, -Math.PI / 2, -Math.PI / 2],
        ],
      ],
      Y: [
        [
          new Mesh(new TorusGeometry(0.5, 0.25, 4, 24), matInvisible),
          [0, 0, 0],
          [Math.PI / 2, 0, 0],
        ],
      ],
      Z: [
        [
          new Mesh(new TorusGeometry(0.5, 0.25, 4, 24), matInvisible),
          [0, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
      ],
    };

    const gizmoScale: any = {
      X: [
        [
          new Mesh(scaleHandleGeometry, matRed),
          [0.5, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
        [new Mesh(lineGeometry2, matRed), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [
          new Mesh(scaleHandleGeometry, matRed),
          [-0.5, 0, 0],
          [0, 0, Math.PI / 2],
        ],
      ],
      Y: [
        [new Mesh(scaleHandleGeometry, matGreen), [0, 0.5, 0]],
        [new Mesh(lineGeometry2, matGreen)],
        [
          new Mesh(scaleHandleGeometry, matGreen),
          [0, -0.5, 0],
          [0, 0, Math.PI],
        ],
      ],
      Z: [
        [
          new Mesh(scaleHandleGeometry, matBlue),
          [0, 0, 0.5],
          [Math.PI / 2, 0, 0],
        ],
        [new Mesh(lineGeometry2, matBlue), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [
          new Mesh(scaleHandleGeometry, matBlue),
          [0, 0, -0.5],
          [-Math.PI / 2, 0, 0],
        ],
      ],
      XY: [
        [
          new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matBlueTransparent),
          [0.15, 0.15, 0],
        ],
      ],
      YZ: [
        [
          new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matRedTransparent),
          [0, 0.15, 0.15],
          [0, Math.PI / 2, 0],
        ],
      ],
      XZ: [
        [
          new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matGreenTransparent),
          [0.15, 0, 0.15],
          [-Math.PI / 2, 0, 0],
        ],
      ],
      XYZ: [[new Mesh(new BoxGeometry(0.1, 0.1, 0.1), matWhiteTransparent)]],
    };

    const pickerScale: any = {
      X: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible),
          [0.3, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
        [
          new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible),
          [-0.3, 0, 0],
          [0, 0, Math.PI / 2],
        ],
      ],
      Y: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible),
          [0, 0.3, 0],
        ],
        [
          new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible),
          [0, -0.3, 0],
          [0, 0, Math.PI],
        ],
      ],
      Z: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible),
          [0, 0, 0.3],
          [Math.PI / 2, 0, 0],
        ],
        [
          new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible),
          [0, 0, -0.3],
          [-Math.PI / 2, 0, 0],
        ],
      ],
      XY: [
        [
          new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible),
          [0.15, 0.15, 0],
        ],
      ],
      YZ: [
        [
          new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible),
          [0, 0.15, 0.15],
          [0, Math.PI / 2, 0],
        ],
      ],
      XZ: [
        [
          new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible),
          [0.15, 0, 0.15],
          [-Math.PI / 2, 0, 0],
        ],
      ],
      XYZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 0]],
      ],
    };

    const helperScale: any = {
      X: [
        [
          new Line(lineGeometry, matHelper),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Y: [
        [
          new Line(lineGeometry, matHelper),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Z: [
        [
          new Line(lineGeometry, matHelper),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };

    function setupGizmo(gizmoMap: any) {
      const gizmo = new Object3D();
      for (const name in gizmoMap) {
        for (let i = gizmoMap[name].length; i--; ) {
          const object = gizmoMap[name][i][0].clone();
          const position = gizmoMap[name][i][1];
          const rotation = gizmoMap[name][i][2];
          const scale = gizmoMap[name][i][3];
          const tag = gizmoMap[name][i][4];
          object.name = name;
          object.userData.tag = tag;
          if (position)
            object.position.set(position[0], position[1], position[2]);
          if (rotation)
            object.rotation.set(rotation[0], rotation[1], rotation[2]);
          if (scale) object.scale.set(scale[0], scale[1], scale[2]);
          object.updateMatrix();
          const tempGeometry = object.geometry.clone();
          tempGeometry.applyMatrix4(object.matrix);
          object.geometry = tempGeometry;
          object.renderOrder = Infinity;
          object.position.set(0, 0, 0);
          object.rotation.set(0, 0, 0);
          object.scale.set(1, 1, 1);
          gizmo.add(object);
        }
      }
      return gizmo;
    }

    this.add((this.gizmo["translate"] = setupGizmo(gizmoTranslate)));
    this.add((this.gizmo["rotate"] = setupGizmo(gizmoRotate)));
    this.add((this.gizmo["scale"] = setupGizmo(gizmoScale)));
    this.add((this.picker["translate"] = setupGizmo(pickerTranslate)));
    this.add((this.picker["rotate"] = setupGizmo(pickerRotate)));
    this.add((this.picker["scale"] = setupGizmo(pickerScale)));
    this.add((this.helper["translate"] = setupGizmo(helperTranslate)));
    this.add((this.helper["rotate"] = setupGizmo(helperRotate)));
    this.add((this.helper["scale"] = setupGizmo(helperScale)));

    this.picker["translate"].visible = false;
    this.picker["rotate"].visible = false;
    this.picker["scale"].visible = false;
  }

  updateMatrixWorld(force?: boolean) {
    const mode = this.controls.mode;
    const space = mode === "scale" ? "local" : this.controls.space;
    const quaternion =
      space === "local" ? this.controls.worldQuaternion : _identityQuaternion;
    const eye = this.controls.eye;
    const worldPosition = this.controls.worldPosition;
    const axis = this.controls.axis;
    const size = this.controls.size;

    this.gizmo["translate"].visible = mode === "translate";
    this.gizmo["rotate"].visible = mode === "rotate";
    this.gizmo["scale"].visible = mode === "scale";
    this.helper["translate"].visible = mode === "translate";
    this.helper["rotate"].visible = mode === "rotate";
    this.helper["scale"].visible = mode === "scale";

    this.picker["translate"].visible = mode === "translate";
    this.picker["rotate"].visible = mode === "rotate";
    this.picker["scale"].visible = mode === "scale";

    let handles: Object3D[] = [];
    handles = handles.concat(this.picker[mode].children);
    handles = handles.concat(this.gizmo[mode].children);
    handles = handles.concat(this.helper[mode].children);

    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i] as any;
      handle.visible = true;
      handle.rotation.set(0, 0, 0);
      handle.position.copy(worldPosition);

      let factor;
      // @ts-ignore
      if (this.controls.camera.isOrthographicCamera) {
        // @ts-ignore
        factor =
          (this.controls.camera.top - this.controls.camera.bottom) /
          this.controls.camera.zoom;
      } else {
        // @ts-ignore
        factor =
          worldPosition.distanceTo(this.controls.cameraPosition) *
          Math.min(
            (1.9 * Math.tan((Math.PI * this.controls.camera.fov) / 360)) /
              this.controls.camera.zoom,
            7
          );
      }
      handle.scale.set(1, 1, 1).multiplyScalar((factor * size) / 4);

      // FIX: Detect if this handle is part of the invisible picker group.
      // We check if its parent is one of the picker containers.
      if (handle.parent === this.picker[mode]) {
        // It's a picker. Don't highlight it.
        // Ensure it's invisible (except for raycasting)
        handle.material.opacity = 0;
        continue;
      }

      if (handle.userData.tag === "helper") {
        handle.visible = false;
        if (handle.name === "AXIS") {
          handle.visible = !!axis;
          if (axis === "X") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, 0));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
            if (
              Math.abs(
                _alignVector.copy(_unitX).applyQuaternion(quaternion).dot(eye)
              ) > 0.9
            )
              handle.visible = false;
          }
          if (axis === "Y") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, Math.PI / 2));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
            if (
              Math.abs(
                _alignVector.copy(_unitY).applyQuaternion(quaternion).dot(eye)
              ) > 0.9
            )
              handle.visible = false;
          }
          if (axis === "Z") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
            if (
              Math.abs(
                _alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(eye)
              ) > 0.9
            )
              handle.visible = false;
          }
          if (axis === "XYZE") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
            _alignVector.copy(this.controls.rotationAxis);
            handle.quaternion.setFromRotationMatrix(
              _lookAtMatrix.lookAt(_zeroVector, _alignVector, _unitY)
            );
            handle.quaternion.multiply(_tempQuaternion);
            handle.visible = this.controls.dragging;
          }
          if (axis === "E") handle.visible = false;
        } else if (handle.name === "START") {
          handle.position.copy(this.controls.worldPositionStart);
          handle.visible = this.controls.dragging;
        } else if (handle.name === "END") {
          handle.position.copy(worldPosition);
          handle.visible = this.controls.dragging;
        } else if (handle.name === "DELTA") {
          handle.position.copy(this.controls.worldPositionStart);
          handle.quaternion.copy(this.controls.worldQuaternionStart);
          _tempVector
            .set(1e-10, 1e-10, 1e-10)
            .add(this.controls.worldPositionStart)
            .sub(worldPosition)
            .multiplyScalar(-1);
          _tempVector.applyQuaternion(
            this.controls.worldQuaternionStart.clone().invert()
          );
          handle.scale.copy(_tempVector);
          handle.visible = this.controls.dragging;
        } else {
          handle.quaternion.copy(quaternion);
          if (this.controls.dragging)
            handle.position.copy(this.controls.worldPositionStart);
          else handle.position.copy(worldPosition);
          if (axis) handle.visible = axis.search(handle.name) !== -1;
        }
        continue;
      }

      handle.quaternion.copy(quaternion);

      if (mode === "translate" || mode === "scale") {
        const AXIS_HIDE_THRESHOLD = 0.99;
        const PLANE_HIDE_THRESHOLD = 0.2;
        if (
          handle.name === "X" &&
          Math.abs(
            _alignVector.copy(_unitX).applyQuaternion(quaternion).dot(eye)
          ) > AXIS_HIDE_THRESHOLD
        ) {
          handle.scale.set(1e-10, 1e-10, 1e-10);
          handle.visible = false;
        }
        if (
          handle.name === "Y" &&
          Math.abs(
            _alignVector.copy(_unitY).applyQuaternion(quaternion).dot(eye)
          ) > AXIS_HIDE_THRESHOLD
        ) {
          handle.scale.set(1e-10, 1e-10, 1e-10);
          handle.visible = false;
        }
        if (
          handle.name === "Z" &&
          Math.abs(
            _alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(eye)
          ) > AXIS_HIDE_THRESHOLD
        ) {
          handle.scale.set(1e-10, 1e-10, 1e-10);
          handle.visible = false;
        }
        if (
          handle.name === "XY" &&
          Math.abs(
            _alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(eye)
          ) < PLANE_HIDE_THRESHOLD
        ) {
          handle.scale.set(1e-10, 1e-10, 1e-10);
          handle.visible = false;
        }
        if (
          handle.name === "YZ" &&
          Math.abs(
            _alignVector.copy(_unitX).applyQuaternion(quaternion).dot(eye)
          ) < PLANE_HIDE_THRESHOLD
        ) {
          handle.scale.set(1e-10, 1e-10, 1e-10);
          handle.visible = false;
        }
        if (
          handle.name === "XZ" &&
          Math.abs(
            _alignVector.copy(_unitY).applyQuaternion(quaternion).dot(eye)
          ) < PLANE_HIDE_THRESHOLD
        ) {
          handle.scale.set(1e-10, 1e-10, 1e-10);
          handle.visible = false;
        }
      } else if (mode === "rotate") {
        _tempQuaternion2.copy(quaternion);
        _alignVector
          .copy(eye)
          .applyQuaternion(_tempQuaternion.copy(quaternion).invert());
        if (handle.name.search("E") !== -1)
          handle.quaternion.setFromRotationMatrix(
            _lookAtMatrix.lookAt(eye, _zeroVector, _unitY)
          );
        if (handle.name === "X") {
          _tempQuaternion.setFromAxisAngle(
            _unitX,
            Math.atan2(-_alignVector.y, _alignVector.z)
          );
          _tempQuaternion.multiplyQuaternions(
            _tempQuaternion2,
            _tempQuaternion
          );
          handle.quaternion.copy(_tempQuaternion);
        }
        if (handle.name === "Y") {
          _tempQuaternion.setFromAxisAngle(
            _unitY,
            Math.atan2(_alignVector.x, _alignVector.z)
          );
          _tempQuaternion.multiplyQuaternions(
            _tempQuaternion2,
            _tempQuaternion
          );
          handle.quaternion.copy(_tempQuaternion);
        }
        if (handle.name === "Z") {
          _tempQuaternion.setFromAxisAngle(
            _unitZ,
            Math.atan2(_alignVector.y, _alignVector.x)
          );
          _tempQuaternion.multiplyQuaternions(
            _tempQuaternion2,
            _tempQuaternion
          );
          handle.quaternion.copy(_tempQuaternion);
        }
      }

      handle.visible =
        handle.visible &&
        (handle.name.indexOf("X") === -1 || this.controls.showX);
      handle.visible =
        handle.visible &&
        (handle.name.indexOf("Y") === -1 || this.controls.showY);
      handle.visible =
        handle.visible &&
        (handle.name.indexOf("Z") === -1 || this.controls.showZ);
      handle.visible =
        handle.visible &&
        (handle.name.indexOf("E") === -1 ||
          (this.controls.showX && this.controls.showY && this.controls.showZ));

      handle.material._color =
        handle.material._color || handle.material.color.clone();
      handle.material._opacity =
        handle.material._opacity || handle.material.opacity;
      handle.material.color.copy(handle.material._color);
      handle.material.opacity = handle.material._opacity;

      if (this.controls.enabled && axis) {
        if (handle.name === axis) {
          handle.material.color.copy(this.materialLib.active.color);
          handle.material.opacity = 1.0;
        } else if (
          axis.split("").some(function (a: string) {
            return handle.name === a;
          })
        ) {
          handle.material.color.copy(this.materialLib.active.color);
          handle.material.opacity = 1.0;
        }
      }
    }
    super.updateMatrixWorld(force);
  }
}

class TransformControlsPlane extends Mesh {
  public controls: TransformControls;

  constructor(controls: TransformControls) {
    super(
      new PlaneGeometry(100000, 100000, 2, 2),
      new MeshBasicMaterial({
        visible: false,
        wireframe: true,
        side: DoubleSide,
        transparent: true,
        opacity: 0.1,
        toneMapped: false,
      })
    );
    // @ts-ignore
    this.isTransformControlsPlane = true;
    this.type = "TransformControlsPlane";
    this.controls = controls;
  }

  updateMatrixWorld(force?: boolean) {
    const mode = this.controls.mode;
    let space = this.controls.space;
    const worldPosition = this.controls.worldPosition;
    const worldQuaternion = this.controls.worldQuaternion;
    const eye = this.controls.eye;
    const axis = this.controls.axis;

    this.position.copy(worldPosition);
    if (mode === "scale") space = "local";
    _v1
      .copy(_unitX)
      .applyQuaternion(
        space === "local" ? worldQuaternion : _identityQuaternion
      );
    _v2
      .copy(_unitY)
      .applyQuaternion(
        space === "local" ? worldQuaternion : _identityQuaternion
      );
    _v3
      .copy(_unitZ)
      .applyQuaternion(
        space === "local" ? worldQuaternion : _identityQuaternion
      );
    _alignVector.copy(_v2);

    switch (mode) {
      case "translate":
      case "scale":
        switch (axis) {
          case "X":
            _alignVector.copy(eye).cross(_v1);
            _dirVector.copy(_v1).cross(_alignVector);
            break;
          case "Y":
            _alignVector.copy(eye).cross(_v2);
            _dirVector.copy(_v2).cross(_alignVector);
            break;
          case "Z":
            _alignVector.copy(eye).cross(_v3);
            _dirVector.copy(_v3).cross(_alignVector);
            break;
          case "XY":
            _dirVector.copy(_v3);
            break;
          case "YZ":
            _dirVector.copy(_v1);
            break;
          case "XZ":
            _alignVector.copy(_v3);
            _dirVector.copy(_v2);
            break;
          case "XYZ":
          case "E":
            _dirVector.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        _dirVector.set(0, 0, 0);
    }
    if (_dirVector.length() === 0) {
      this.quaternion.copy(this.controls.cameraQuaternion);
    } else {
      _tempMatrix.lookAt(_tempVector.set(0, 0, 0), _dirVector, _alignVector);
      this.quaternion.setFromRotationMatrix(_tempMatrix);
    }
    super.updateMatrixWorld(force);
  }
}
