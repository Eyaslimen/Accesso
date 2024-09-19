import socket
import time
import threading

BUFFER_SIZE = 4096

def send_request(host, port, body, requestid, response_event, response_data):
    """
    Sends a command to a specified host and port.
    
    Args:
        host (str): The hostname or IP address to connect to.
        port (int): The port number to connect to.
        body (str): The body of the request containing a placeholder for requestid.
        requestid (int): The ID for the current request.
        response_event (threading.Event): Event to signal when the response is received.
        response_data (list): Shared list to store the response.
    """
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, int(port)))

        # Prepare the message
        body_pay = body.replace('21541254', str(requestid))
        b_body = bytes(body_pay, 'utf-8')
        b_header = (len(b_body)).to_bytes(4, byteorder='big')
        
        # Send requests
        s.send(b_header)
        s.send(b_body)
        
        # Signal that the request has been sent
        print("Request sent")
        
        # Wait for the response
        response_event.wait()  # Wait until notified
        s.close()
        
    except socket.error as e:
        print(f"Socket error while sending: {e}")
    finally:
        if s:
            s.close()

def receive_response(s, response_event, response_data):
    """
    Receives a response from the server.
    
    Args:
        s (socket.socket): The connected socket.
        response_event (threading.Event): Event to signal when the response is received.
        response_data (list): Shared list to store the response.
    """
    try:
        b_res = s.recv(BUFFER_SIZE)
        res = b_res[4:].decode('utf-8')  # Skipping the header
        
        if len(res) == 0:
            print("Empty response")
            response_data.append(-1)
        else:
            print("Response received")
            response_data.append(res)

    except socket.error as e:
        print(f"Socket error while receiving: {e}")
        response_data.append(-1)
    finally:
        response_event.set()  # Signal that the response has been received
        if s:
            s.close()

def SenCmd_req(host, port, body, requestid, i):
    """
    Sends a command and waits for the response using multithreading.
    
    Args:
        host (str): The hostname or IP address.
        port (int): The port number.
        body (str): The request body.
        requestid (int): The request ID.
        i (int): Multiplier for sleep time (in milliseconds).
        
    Returns:
        str: The server response or -1 in case of failure.
    """
    response_event = threading.Event()
    response_data = []

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))

    # Start sending in a separate thread
    send_thread = threading.Thread(target=send_request, args=(host, port, body, requestid, response_event, response_data))
    receive_thread = threading.Thread(target=receive_response, args=(s, response_event, response_data))

    send_thread.start()
    time.sleep(i * 0.001)  # Simulate delay before starting to receive
    receive_thread.start()

    send_thread.join()
    receive_thread.join()

    # Return the response
    return response_data[0] if response_data else -1

# Example usage
# response = SenCmd_req("localhost", 12345, "Your message here with 21541254", 1, 200)
# print("Final Response:", response)
Explanation
Threads: The send_request and receive_response functions are run in separate threads, allowing them to operate concurrently.
Threading Events: A threading.Event is used to signal when the response is ready. The sending thread waits for this event before closing the socket.
Shared Data: A list (response_data) is used to store the received response, allowing communication between the threads.
Join Threads: After starting both threads, the main function waits for both to complete using join().
This setup provides a non-blocking way to handle sending and receiving over a socket, making it more responsive in a multi-threaded environment.