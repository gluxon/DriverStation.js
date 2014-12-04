# node-driverstation

Node.js API for the client-side FRC Driver Station

## License

node-driverstation is written under the [MIT License](http://opensource.org/licenses/MIT)

### 0.6
These changes are from FRC 2539, the Krypton Cougars. Many thanks to them!
- Added ability to change control modes other than enable/disable
- Robot Code detection

### 0.5
- (API Change) Main class now extended from EventEmitter
- Better teamID validation and change handling

### 0.4
- Modified bit when enabled to 0x60 and disabled to 0x40 (not sure if this is right)

### 0.3.2
- Typo with voltage data fixed

### 0.3.1
- Add disable()

### 0.3
- Emit robotData
- Incomplete but sufficient parsing of robotData done

### 0.2
- Emit connect and disconnect
- Utility function for converting team number to IP

### 0.1
- Initial Release
